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



app.post('/customers', async (req : Request, res: Response) => {
    const userId = uuidv4()
    const password = await bcrypt.hash(req.body.password , 10)
    const customer: Customer = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        id: userId,
        email : req.body.email,
        password : password
    }
    userRepository.save(customer);
    return res.status(201).send(customer);
})

app.post('/customers/login', async (req: Request, res: Response) => {
   const user = userRepository.findByEmail(req.body.email);
   console.log(user);
  const comparedPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(comparedPassword);
  return res.sendStatus(200)
})

app.get('/customers/:id', (req :Request, res : Response) => {
    const user = userRepository.getById(req.params.id);
    return res.status(200).send(user);
})


app.listen(3000, () => {
    console.log(`listening on port 3000`)
})


 app.use((req: Request, res: Response, next) => {
     console.log('dany');
    return next();
})


