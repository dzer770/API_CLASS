import request from 'supertest';
import {app, userRepository} from '../../index';

describe('Customer Api', () => {
    let userId = null;
    let accessToken = null;
    beforeEach(async () => {
        await request(app)
        .post('/customers')
        .send({
            firstname: "dan",
            lastname : "zerdoun",
            age: 29,
            email: "zerdoun770@gmail.com",  
            password:"chalom123"
        })
        .expect(200)
        .expect(resp => {
            userId = resp.body.id;
            console.log(resp.body);
            expect(resp.body.firstname).toEqual('dan');
            expect(resp.body.age).toEqual(29);
        })

        await request(app)
        .post('/customers/login')
        .send({
            email: 'zerdoun770@gmail.com',
            password: 'chalom123',
        })
        .expect(200)
        .expect(resp => {
            accessToken = resp.body.accessToken;
            expect(resp.body.accessToken).toBeDefined();
        })
    })


    afterEach(() => {
        userRepository.clear();
    })

    it('Should get a customer by his id', async () => {
        await request(app)
        .get(`/customers/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect(resp =>{
            expect(resp.body.email).toEqual('zerdoun770@gmail.com');
            expect(resp.body.firstname).toEqual('dan');
            expect(resp.body.age).toEqual(29)
        })       
    })

    it('Should delete a customer by his id', async () => {
        await request(app)
        .delete(`/customers/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
    })

    it('Should update a customer', async () => {
        await request(app)
        .patch(`/customers/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            firstname: 'chalom',
            lastname : 'ellezam',
            age: 29
        })
        .expect(200)
        .expect(resp => {
            expect(resp.body.firstname).toEqual('chalom');
            expect(resp.body.lastname).toEqual('ellezam');
            expect(resp.body.age).toEqual(29);
        })
    })
})


    

        