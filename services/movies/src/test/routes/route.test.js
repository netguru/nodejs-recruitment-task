const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.use(chaiHttp);

// this token is valid for only 30 mins so the test might fails
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0OTAzMDkyNCwiZXhwIjoxNjQ5MDMyNzI0LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.i4LL28dMakHgyKwLB032A0iCbc_TDPr-Sb3rgqPP7Kg';
const notoken = '';
describe('movie endpoints', () => {
    beforeEach(() => {});
    it('should create movie for authenticated user', (done) => {
        chai.request(app)
            .post('/movies')
            .auth(token, { type: 'bearer' })
            .set({
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            })
            .send({
                title: 'amazing spider man'
            })
            .end((err, res) => {
                expect(res.status).to.eq(201);
                done();
            });
    });

    it('should not create movie for un-authenticated', (done) => {
        chai.request(app)
            .post('/movies')
            .auth(token, { type: 'bearer' })
            .set({
                'content-type': 'application/json',
                Authorization: `Bearer ${notoken}`
            })
            .send({
                title: 'amazing spider man'
            })
            .end((err, res) => {
                expect(res.status).to.eq(401);
                done();
            });
    });
});

// // describe('logged in user create movies', function () {
// //     it('should create movie', function (done) {
// //         chai.request(app)
// //             .post('/ap')
// //             .set({
// //                 'content-type': 'application/json'
// //             })
// //             .send({
// //                 title: 'amazing spider man'
// //             })
// //             .end((err, res) => {
// //                 expect(res.status).to.eq(200);
// //                 done();
// //             });
// //     });
// // });
