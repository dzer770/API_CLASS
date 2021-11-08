import { Request, Response, Application } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const app: Application = express();
import { UserRepository,Customer} from './src/UserRepository';
import {v4 as uuidv4} from 'uuid';


const userRepository = new UserRepository()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/customers', (req : Request, res: Response) => {
    const userId = uuidv4()
    const customer: Customer = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        id: userId
    }
    userRepository.save(customer);
    return res.status(201).send(customer);
})


app.put('/customers/:id', (req : Request, res: Response) => {
    const userId = req.params.id
    const customer: Customer = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        id: userId
    }
    userRepository.update(customer);
    return res.status(200).send(customer);
})

app.get('/customers/:id', (req :Request, res : Response) => {
     const user = userRepository.getById(req.params.id);
     return res.status(200).send(user);
})

app.get('/customers', (req : Request, res : Response) => {
    const users = userRepository.getAll();
    return res.status(200).send(users);
})

app.delete('/customers/:id', (req : Request, res: Response) => {
    const users = userRepository.delete(req.params.id)
    return res.status(200).send(users)
})

app.delete('/customers', (req : Request, res :Response)=> {
    userRepository.clear()
    return res.status(200).send('ALL_WAS_DELETE')
})

app.listen(3000, () => {
    console.log(`listening on port 3000`)})



