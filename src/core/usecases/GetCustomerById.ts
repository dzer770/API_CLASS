import { Customer } from "../aggregates/Customer";
import { UserRepository } from "../repositories/UserRepository";
import { Usecase } from "./Usecase";


export interface GetCustomerByIdRequest {
    userId: string;
}

export class GetCustomerById implements Usecase<GetCustomerByIdRequest, Customer> {

    constructor(
       private readonly _userRepository : UserRepository
    ) {}


     async execute(request: GetCustomerByIdRequest): Promise<Customer> {
        const customer = await this._userRepository.getById(request.userId)
        return customer
   }
}


