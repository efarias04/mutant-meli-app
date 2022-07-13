import dateFormat from 'dateformat';
import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import { constants } from 'http2';
import MutantService from '../services/MutantService';
import OpenApiValidatorProvider from '../utilities/OpenApiValidatorProvider';

const debug = debugLib('app:MutantValidatorController');
const MutantValidatorController = Router();
const validator = OpenApiValidatorProvider.getValidator();
const routeToValidateGET = '/stats';
const routeToValidatePOST = '/mutant';

MutantValidatorController.post(routeToValidatePOST,
    validator.validate('post', routeToValidatePOST),
    async (req: Request, res: Response) => {
        await MutantService.validateDNA(req, res);
    });

MutantValidatorController.get(routeToValidateGET,
    validator.validate('get', routeToValidateGET),
    async (req: Request, res: Response) => {
        await MutantService.getStats(req, res);
    });

export default MutantValidatorController;
