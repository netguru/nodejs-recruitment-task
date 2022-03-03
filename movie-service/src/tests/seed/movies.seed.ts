import {SuperTest} from "supertest";
import {moviesTitles} from "../movies-titles";

export const add5Movies = async (supertest: SuperTest<any>, userToken)=>{
    for (let i = 0; i < moviesTitles.length; i++) {
        console.log(userToken)
        await supertest.post('/api/movies').set('Authorization', 'Bearer ' + userToken).send({
            title: moviesTitles[i].title
        })
    }
}