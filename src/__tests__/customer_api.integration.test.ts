import request from 'supertest';
import {app, userRepository} from '../../index';

describe('Customer Api', () => {
    let userId = null;

    beforeEach(async () => {
        await request(app)
        .post('/customers')
        .send({
            firstname: "dan",
            lastname : "zerdoun",
            age: 29,
            email: "zerdoun770",  
            password:"chalom123"
        })
        .expect(200)
        .expect(resp => {
            userId = resp.body.id;
            expect(resp.body.firstname).toEqual('dan');
            expect(resp.body.age).toEqual(29);
        })
    })


    afterEach(() => {
        userRepository.clear();
    })

    it('Should login a customer', async () => {
        await request(app)
            .post('/customers/login')
            .send({
                email: 'zerdoun770',
                password: 'chalom123',
            })
            .expect(200)
            .expect(resp => {

                expect(resp.body.accessToken).toBeDefined();
            })
    })

    it('Should get a customer by his id', async () => {
        let accessToken = null;
        await request(app)
        .post('/customers/login')
        .send({
            email: 'zerdoun770',
            password: 'chalom123',
        })
        .expect(200)
        .expect(resp => {
            accessToken = resp.body.accessToken;
            expect(resp.body.accessToken).toBeDefined();
        })

        await request(app)
        .get(`/customers/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect(resp =>{
            expect(resp.body.email).toEqual('zerdoun770');
            expect(resp.body.firstname).toEqual('dan');
            expect(resp.body.age).toEqual(29)
        })       
    })
    it('Should delete a customer by his id', async () => {
        let accessToken = null;
        
        await request(app)
        .post('/customers/login')
        .send({
            email: 'zerdoun770',
            password: 'chalom123',
        })
        .expect(200)
        .expect(resp => {
            accessToken = resp.body.accessToken;
            expect(resp.body.accessToken).toBeDefined();
        })

        await request(app)
        .delete(`/customers/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
    
    })
})
        