import { Request, Response, Application } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const app: Application = express();
import { UserRepository,Customer} from './src/UserRepository';
import {v4 as uuidv4} from 'uuid'
const bcrypt = require ('bcryptjs');

const userRepository = new UserRepository()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/customers', (req : Request, res: Response) => {
    const userId = uuidv4()
    const customer: Customer = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        id: userId,
        email : req.body.email,
        password : req.body.password
    }
    userRepository.save(customer);
    return res.status(201).send(customer);
})


app.listen(3000, () => {
    console.log(`listening on port 3000`)})



    app.use((req: Request, res: Response, next) => {
        console.log('dany');
        return next();
    })


