import { Customer, CustomerProperties } from "../aggregates/Customer";
import { UserRepository } from "../repositories/UserRepository";
import { Usecase } from "./Usecase";


export interface UpdateCustomerRequest {
    firstname : string,
    lastname : string,
    age : number;
    userId: string;
}

export class UpdateCustomer implements Usecase<UpdateCustomerRequest,Customer> {
     
    constructor(
        private readonly _userRepository : UserRepository
    ) {}

    async execute(request: UpdateCustomerRequest): Promise<Customer> {
        const customer = await this._userRepository.getById(request.userId);
        customer.update({
            firstname: request.firstname,
            lastname: request.lastname,
            age: request.age,
        });
        await this._userRepository.update(customer);
        return customer;
    }


    
}