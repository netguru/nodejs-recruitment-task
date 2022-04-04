const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.use(chaiHttp);

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0OTAxMzIyMiwiZXhwIjoxNjQ5MDE1MDIyLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.lflsg3EwuQoQ2MsTYGLHiJmt0FBiq8_p6_qCk84V7Kc';

describe('movie endpoints', () => {
    beforeEach(() => {});
    it('should throw error if user is not autheticated', (done) => {
        chai.request(app)
            .post('/movies')
            .auth(token, { type: 'bearer' })
            .set({
                'content-type': 'application/json'
            })
            .send({
                title: 'amazing spider man'
            })
            .end((err, res) => {
                expect(res.status).to.eq(200);
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
