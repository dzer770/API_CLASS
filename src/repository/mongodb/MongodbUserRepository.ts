import { Customer } from "../../aggregates/Customer";
import { UserRepository } from "../UserRepository";
import { CustomerModel } from "./models/CustomerModel";



export class MongodbUserRepository implements UserRepository {

    async findByEmail(email: string): Promise<Customer> {
        const result = await CustomerModel.findOne({
            email: email,
        })
        return result;
    }
    async save(customer: Customer): Promise<Customer> {
        const newcustomer = await new CustomerModel({
         firstname: customer.firstname,
         lastname: customer.lastname,
         age: customer.age,
         email: customer.email,
         password: customer.password,
         id: customer.id,
        }).save();
        return newcustomer    
    }

    async getAll(): Promise<Customer[]> {
        const result = await CustomerModel.find();
        return result
    }
    async getById(id: string): Promise<Customer> {
        const result = await CustomerModel.findOne({
            id : id
        });
        return result
    }

    async delete(id: string): Promise<void> {
        await CustomerModel.deleteOne({
            id: id
        });    
    }
    
    async exist(id: string): Promise<boolean> {
        const result = await CustomerModel.findOne({
            id : id
        })
        return result != null;
             
    }


    async update(customer: Customer): Promise<void> {
        const updatedCustomer = await CustomerModel.findOneAndUpdate({
            id: customer.id,
        }, {
            $set: {
                firstname: customer.firstname,
                lastname : customer.lastname,
                age : customer.age
            }
        }, {
            new: true,
        });
    }

    async clear(): Promise<void> {
        await CustomerModel.deleteMany()    
    } 
}
