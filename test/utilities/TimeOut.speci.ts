import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import { constants } from 'http2';
import nock from 'nock';
import path from 'path';
import sinon from 'sinon';

import app from '../../src/app';
import config from '../../src/config';

chai.use(chaiHttp);

const expect = chai.expect;
const apiPath = config.apiPath;
const localPath = '../resources';

describe('TimeOut Test', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    let configStub: any;

    // import body
    const mutantBodyFile = path.join(__dirname, `${localPath}/mutantBody.json`);
    const goodRequestBody = JSON.parse(fs.readFileSync(mutantBodyFile, 'utf8').toString());

    const goodHeaders = {
        'X-Channel': 'BancaVirtual',
        'X-RqUID': '4ca5140b-e72c-4a60-b6e3-1aad3849800b',
        'X-CustIdentNum': '1001192125',
        'X-CustIdentType': 'CC',
        'X-IPAddr': '127.0.0.1',
        'X-Name': 'Pymes',
        'X-API-KEY': 'some api key ._.'
    };

    xit(`Given a request 
        When the timeout expires 
        Then timeout returns`, async () => {

        configStub = sinon.createSandbox();

        nock('https://www.preselecta-v1.com')
            .post('/preselecta')
            .delayConnection(100)
            .reply(200, 'OK', {
                'Content-Type': 'application/json'
            });
        configStub.replace(config, 'requestTimeOut', '20');
        const res = await chai.request(app)
            .post(apiPath + '/V2/Utilities/bureau/preselecta',)
            .set(goodHeaders).send(goodRequestBody);

        expect(res.status).to.equals(constants.HTTP_STATUS_REQUEST_TIMEOUT);
        configStub.restore();
    });
});