import { Customer } from "../aggregates/Customer";
import { EncryptionGateway } from "../gateways/EncryptionGateway";
import { UserRepository } from "../repositories/UserRepository";
import { Usecase } from "./Usecase";
import {v4 as uuidv4} from 'uuid';

export interface CreateUserRequest {
    lastname: string;
    age: number;
    email: string;
    password: string;
    firstname: string;
}

export class CreateUser implements Usecase<CreateUserRequest, Customer> {

    constructor(
        private readonly _encryptionGateway: EncryptionGateway,
        private readonly _userRepository: UserRepository,
    ) {

    }

    async execute(request: CreateUserRequest): Promise<Customer> {
        const userId = uuidv4()
        const email = request.email;
        const password = await this._encryptionGateway.encrypt(request.password);
        const customer = Customer.create({
            firstname: request.firstname,
            lastname: request.lastname,
            age: request.age,
            id: userId,
            email : email,
            password : password
        })
        await this._userRepository.save(customer);
        return customer;
    }
}