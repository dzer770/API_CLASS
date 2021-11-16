import { Request, Response, Application, NextFunction } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const app: Application = express();
import { UserRepository,Customer} from './src/UserRepository';
import {v4 as uuidv4} from 'uuid'
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const privateSecret = 'evibzefvbiaerbviaoerfeir'


const userRepository = new UserRepository();



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
    userRepository.save(customer);
    return res.status(200).send(customer);
})


app.post('/customers/login', async (req: Request, res: Response) => {
   const user = userRepository.findByEmail(req.body.email);
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
app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization.split(' ')[1];
        const identity = jwt.verify(authorization,privateSecret)
        return next();
    } catch(e) {
        return res.sendStatus(401)
    }
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


