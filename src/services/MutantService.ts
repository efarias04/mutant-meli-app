import dateFormat from 'dateformat';
import debugLib from 'debug';
import { Request, Response } from 'express';
import { constants } from 'http2';
import config from '../config';
import { IRequestMutant } from '../models/IRequestMutant';
import { ResponseDefaultDto } from '../models/ResponseDefaultDto';
import { Status } from '../models/ResponseErrorStatusDto';
import DateUtilities from '../utilities/DateUtilities';
import UtilsMatrix from '../utilities/UtilsMatrix';
import DatabaseService from './database/DatabaseService';
import MongoService from './database/impl/MongoService';
import CountSequencesHorizontalStrategy from './strategy/CountSequencesHorizontalStrategy';
import CountSequencesObliqueStrategy from './strategy/CountSequencesObliqueStrategy';
import CountSequencesVerticalStrategy from './strategy/CountSequencesVerticalStrategy';
import ValidateSequenceContext from './strategy/ValidateSequenceContext';

const debug = debugLib('app:MutantService');
const TIME_ZONE = 'yyyy-mm-dd\'T\'HH:MM:ss';

export default class MutantService {

    /**
     * Check validation DNA and return response
     * @param  {Request} req
     * @param  {Response} res
     */
    public static async validateDNA(req: Request, res: Response) {
        try {
            const request = req.body as IRequestMutant;
            debug('the body data: %o', request.dna);
            const matrixNormalized = UtilsMatrix.normalizeMatriz(request.dna);
            debug('Normalized: %O', matrixNormalized);
            UtilsMatrix.validateMatrixNxN(matrixNormalized);
            const isMutant = await this.isMutant(matrixNormalized);
            const status = isMutant ? constants.HTTP_STATUS_OK : constants.HTTP_STATUS_FORBIDDEN;
            res.status(status).json({ isMutant });
        } catch (error: any) {
            debug('ha ocurrido un error $j', error);
            const statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            const status: Status = {
                ServerStatusCode: statusCode.toString(),
                Severity: 'Error',
                StatusCode: statusCode,
                StatusDesc: `Error in resource '${req.url}: ${error.message}`
            };
            const endDt = dateFormat(DateUtilities.currentDateWithTimezone(-5), TIME_ZONE);
            const reason = new ResponseDefaultDto(status, endDt);
            res.status(statusCode).send(reason); // NOSONAR
        }
    }

    /**
     * Get stats DNA validation
     * @param  {Request} req
     * @param  {Response} res
     * @returns Promise
     */
    public static async getStats(req: Request, res: Response): Promise<any> {

        const db = new DatabaseService(new MongoService());
        const response = await db.getStats();

        res.status(constants.HTTP_STATUS_OK).json({
            count_human_dna: response.totalHuman,
            count_mutant_dna: response.totalMutant,
            ratio: response.totalMutant / response.totalHuman
        });
    }

    /**
     * In base to DNA detect if is mutant or human
     * @param  {string[][]} dna
     * @returns Promise
     */
    private static async isMutant(dna: string [][]): Promise<boolean> {

        if(dna.length < config.consecutiveMinimumSequence) {
            return Promise.resolve(false);
        }

        let totalSecuencesFound = 0;
        const horizontalContext = new ValidateSequenceContext(new CountSequencesHorizontalStrategy());
        const verticalContext = new ValidateSequenceContext(new CountSequencesVerticalStrategy());
        const obliqueContext = new ValidateSequenceContext(new CountSequencesObliqueStrategy());

        totalSecuencesFound = await horizontalContext.getProviderService(dna);
        totalSecuencesFound += await verticalContext.getProviderService(dna);
        totalSecuencesFound += await obliqueContext.getProviderService(dna);

        const rotateMatrix = UtilsMatrix.rotate90Clockwise(dna);
        debug('Rotated: %O', rotateMatrix);
        totalSecuencesFound += await obliqueContext.getProviderService(rotateMatrix);

        debug('===========> Total sequences found: [%d]', totalSecuencesFound);
        const validation = totalSecuencesFound > +config.mutantMinimunSequence;
        const typeDna = validation ? 'mutant' : 'human';

        const db = new DatabaseService(new MongoService());
        await db.saveValidation(dna, typeDna);

        return Promise.resolve(validation);
    }
}
