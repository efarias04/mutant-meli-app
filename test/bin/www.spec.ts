import chai from 'chai';
import server from '../../src/bin/Server';

const expect = chai.expect;

describe('Server Test', () => {
    before(function () {
        // LIFT YOUR SERVER //
    });

    it('constructor method', () => {
        expect(server).to.be.a('object');
        expect(server.timeout).to.be.a('number');
    });

    after(function () {
        server.close();
    });
});
