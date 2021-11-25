import { Request, Response, Application, NextFunction } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
import { AuthenticatedRequest } from './src/types/AuthenticatedRequest';
const privateSecret = 'evibzefvbiaerbviaoerfeir';
import mongoose from "mongoose";
import { MongodbUserRepository } from './src/adapters/repository/mongodb/MongodbUserRepository';
import { BcryptEncryptionGateway } from './src/adapters/gateways/BcryptEncryptionGateway';
import { JwtIdentityGateway } from './src/adapters/gateways/JwtIdentityGateway';
import { CreateUser } from './src/core/usecases/CreateUser';
import { GetCustomerById } from './src/core/usecases/GetCustomerById';
import { UpdateCustomer } from './src/core/usecases/UpdateCustomer';

const uri: string = "mongodb://127.0.0.1:27017/customers";

const connection = mongoose.connect(uri, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
});

export const userRepository = new MongodbUserRepository();
const bcryptEncryptionGateway = new BcryptEncryptionGateway();
const jwtIdentityGateway = new JwtIdentityGateway(privateSecret);
const createUser = new CreateUser(
    bcryptEncryptionGateway,
    userRepository
)
const getCustomerById = new GetCustomerById(
    userRepository
)
const updateCustomer = new UpdateCustomer(
    userRepository
)

export const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/customers', async (req : Request, res: Response) => {
    const customer = await createUser.execute({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
    })
    return res.status(200).send(customer.props);
})


app.post('/customers/login', async (req: Request, res: Response) => {
   const user = await userRepository.findByEmail(req.body.email);
   const comparedPassword = await bcryptEncryptionGateway.compare(req.body.password, user.props.password);
  if (!comparedPassword) {
      return res.status(401).send({
          message: "invalid_password"
      })
  }
  const token = await jwtIdentityGateway.encode({
      email: user.props.email,
      id: user.props.id
    })

  return res.status(200).send({
    accessToken: token
  })
})

// Creer un middleware qui va faire le .verify du token
app.use(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization.split(' ')[1];
        const identity = await jwtIdentityGateway.verify(authorization);
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
    const user = await getCustomerById.execute({userId: req.params.id});
    return res.status(200).send(user.props);
})

app.delete('/customers/:id',async (req: Request,res: Response) =>{
    await userRepository.delete(req.params.id)
    return res.sendStatus(200)
})

app.patch('/customers/:id', async (req: AuthenticatedRequest, res: Response) => {
    const user = await updateCustomer.execute({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        age : req.body.age,
        userId : req.params.id
    })
    return res.status(200).send(user.props);
})

    






