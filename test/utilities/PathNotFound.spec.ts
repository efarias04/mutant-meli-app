import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import { constants } from 'http2';
import path from 'path';

import app from '../../src/app';
import config from '../../src/config';

chai.use(chaiHttp);

const expect = chai.expect;
const apiPath = config.apiPath;
const localPath = '../resources';

describe('TimeOut Test', () => {

    // import body
    const mutantBodyFile = path.join(__dirname, `${localPath}/mutantBody.json`);
    const goodRequestBody = JSON.parse(fs.readFileSync(mutantBodyFile, 'utf8').toString());

    const goodHeaders = {
        'X-Name-Mutant': 'Some Mutant',
    };

    it(`Given a request 
        When the path no exists 
        Then returns 404`, async () => {
    
        const res = await chai.request(app)
            .post(apiPath + '/mutanti',)
            .set(goodHeaders).send(goodRequestBody);
        expect(res.status).to.equals(constants.HTTP_STATUS_NOT_FOUND);
    });
});