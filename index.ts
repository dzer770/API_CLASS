import { Request, Response, Application, NextFunction } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
import {v4 as uuidv4} from 'uuid';
import { AuthenticatedRequest } from './src/types/AuthenticatedRequest';
import { Customer } from './src/aggregates/Customer';
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const privateSecret = 'evibzefvbiaerbviaoerfeir';
import mongoose from "mongoose";
import { MongodbUserRepository } from './src/repository/mongodb/MongodbUserRepository';

const uri: string = "mongodb://127.0.0.1:27017/customers";

const connection = mongoose.connect(uri, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
});

export const userRepository = new MongodbUserRepository();
export const app: Application = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/customers', async (req : Request, res: Response) => {
    const userId = uuidv4()
    const email = req.body.email
    const password = await bcrypt.hash(req.body.password , 10)
    const customer: Customer = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        id: userId,
        email : email,
        password : password
    }
    await userRepository.save(customer);
    return res.status(200).send(customer);
})


app.post('/customers/login', async (req: Request, res: Response) => {
   const user = await userRepository.findByEmail(req.body.email);
   console.log(user);
  const comparedPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(comparedPassword);
  const token = jwt.sign({
      email: user.email,
      id: user.id
    }, privateSecret)

  return res.status(200).send({
    accessToken: token
  })
})

// Creer un middleware qui va faire le .verify du token
app.use((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization.split(' ')[1];
        const identity = jwt.verify(authorization,privateSecret);
        req.user = identity;
        return next();
    } catch(e) {
        return res.sendStatus(401)
    }
})


app.get('/customers/:id', async (req: AuthenticatedRequest, res : Response) => {
    console.log(req.user);
    if (req.params.id !== req.user.id){
        return res.sendStatus(401);
    };
    const user = await userRepository.getById(req.params.id);
    return res.status(200).send(user);
})

app.delete('/customers/:id',async (req: Request,res: Response) =>{
    await userRepository.delete(req.params.id)
    return res.sendStatus(200)
})


//app.listen(3000, () => {
//    console.log(`listening on port 3000`)
//})






