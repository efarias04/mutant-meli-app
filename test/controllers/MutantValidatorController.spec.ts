import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import config from '../../src/config';
import Sinon from 'sinon';
import fs from 'fs';
import nock from 'nock';
import path from 'path';
import MongoService from '../../src/services/database/impl/MongoService';

chai.use(chaiHttp);
const expect = chai.expect;
const apiPath = config.apiPath;
const localPath = '../resources';

// import body
const mutantBodyFile = path.join(__dirname, `${localPath}/mutantBody.json`);
const mutantBody = JSON.parse(fs.readFileSync(mutantBodyFile, 'utf8').toString());

const humanBodyFile = path.join(__dirname, `${localPath}/humanBody.json`);
const humanBody = JSON.parse(fs.readFileSync(humanBodyFile, 'utf8').toString());

const errorNxNFile = path.join(__dirname, `${localPath}/dnaErrorNxN.json`);
const errorNxNBody = JSON.parse(fs.readFileSync(errorNxNFile, 'utf8').toString());

const smallerFile = path.join(__dirname, `${localPath}/bodySmaller.json`);
const smallerBody = JSON.parse(fs.readFileSync(smallerFile, 'utf8').toString());

let sandbox: any;

/* tslint:disable */
describe('POST /mutant', () => {

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
    nock.cleanAll();
  });

  afterEach(() => {
    sandbox.restore();
    nock.cleanAll();
  });

  const goodHeaders = {
    'X-Name-Mutant': 'AgujaDinamica',
  };

  it(`Dado que se requiere determinar si una secuencia de ADN pertenece a un mutante o no,
  Cuando se pase la secuencia de ADN de un mutante,
  Debe retornar una respuesta satisfactoria con status 200`, (done) => {

    sandbox.stub(MongoService.prototype, 'saveValidation').returns(Promise.resolve());

    chai.request(app)
      .post(apiPath + '/mutant',)
      .set(goodHeaders).send(mutantBody)
      .end((err, res) => {
        expect(res.status).to.equals(200);
        done();
      });
  });

  it(`Dado que se requiere determinar si una secuencia de ADN pertenece a un mutante o no,
  Cuando se pase la secuencia de ADN de un humano,
  Debe retornar una respuesta satisfactoria con status 403`, (done) => {

    sandbox.stub(MongoService.prototype, 'saveValidation').returns(Promise.resolve());

    chai.request(app)
      .post(apiPath + '/mutant',)
      .set(goodHeaders).send(humanBody)
      .end((err, res) => {
        expect(res.status).to.equals(403);
        done();
      });
  });

  it(`Dado que se requiere determinar si una secuencia de ADN pertenece a un mutante o no,
  Cuando se pase una secuenca de ADN que no es de la forma NxN,
  Debe retornar una respuesta de error con status 500`, (done) => {

    sandbox.stub(MongoService.prototype, 'saveValidation').returns(Promise.resolve());

    chai.request(app)
      .post(apiPath + '/mutant',)
      .set(goodHeaders).send(errorNxNBody)
      .end((err, res) => {
        expect(res.status).to.equals(500);
        done();
      });
  });

  it(`Dado que se requiere determinar si una secuencia de ADN pertenece a un mutante o no,
  Cuando se pase una secuenca de de dimensión N < # caracteres consecutivos,
  Debe retornar una respuesta con status 403 indicando que es un humano`, (done) => {

    sandbox.stub(MongoService.prototype, 'saveValidation').returns(Promise.resolve());

    chai.request(app)
      .post(apiPath + '/mutant',)
      .set(goodHeaders).send(smallerBody)
      .end((err, res) => {
        expect(res.status).to.equals(403);
        done();
      });
  });
});

/* tslint:disable */
describe('GET /stats', () => {

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
    nock.cleanAll();
  });

  afterEach(() => {
    sandbox.restore();
    nock.cleanAll();
  });

  const goodHeaders = {
    'X-Name-Mutant': 'AgujaDinamica',
  };

  it(`obtener stats`, (done) => {

    sandbox.stub(MongoService.prototype, 'getStats').returns(Promise.resolve({
      "count_human_dna": 100,
      "count_mutant_dna": 40,
      "ratio": 0.4
  }));

    chai.request(app)
      .get(apiPath + '/stats',)
      .set(goodHeaders).send()
      .end((err, res) => {
        expect(res.status).to.equals(200);
        done();
      });
  });
});

