//Require the dev-dependencies
let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);

describe('/GET address search', () => {
    it('it should GET the address if present', (done) => {
        chai.request(server)
            .get('/address/search?search=White Bear Yard')
            .end((err, res) => {
                // res.should.have.status(200);
                assert.equal(res.statusCode, 200);
                res.body.should.be.a('object');
                res.body.should.include.keys(['status', 'search', 'location']);
                done();
            });
    });

    it('it should not find the address', (done) => {
        chai.request(server)
            .get('/address/search?search=India Mumbai')
            .end((err, res) => {
                // res.statusCode.should.equal(200);
                assert.equal(res.statusCode, 200);
                res.body.should.be.a('object');
                res.body.should.include.keys(['status', 'search']);
                assert.equal("NOT_FOUND", res.body.status)
                done();
            });
    });

    it('it should give 400 ', (done) => {
        chai.request(server)
            .get('/address/search')
            .end((err, res) => {
                assert.equal(res.statusCode, 400);
                done();
            });
    });
});