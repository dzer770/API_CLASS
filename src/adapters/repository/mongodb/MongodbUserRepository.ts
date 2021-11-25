import { Customer } from "../../../core/aggregates/Customer";
import { UserRepository } from "../../../core/repositories/UserRepository";
import { CustomerModel } from "./models/CustomerModel";



export class MongodbUserRepository implements UserRepository {

    async findByEmail(email: string): Promise<Customer> {
        const result = await CustomerModel.findOne({
            email: email,
        })
        return new Customer(result);
    }
    async save(customer: Customer): Promise<Customer> {
        const newcustomer = await new CustomerModel({
         firstname: customer.props.firstname,
         lastname: customer.props.lastname,
         age: customer.props.age,
         email: customer.props.email,
         password: customer.props.password,
         id: customer.props.id,
        }).save();
        return newcustomer    
    }

    async getAll(): Promise<Customer[]> {
        const result = await CustomerModel.find();
        return result.map(customer => new Customer(customer));
    }
    async getById(id: string): Promise<Customer> {
        const result = await CustomerModel.findOne({
            id : id
        });
        return new Customer(result);
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
        await CustomerModel.findOneAndUpdate({
            id: customer.props.id,
        }, {
            $set: {
                firstname: customer.props.firstname,
                lastname : customer.props.lastname,
                age : customer.props.age
            }
        }, {
            new: true,
        });
    }

    async clear(): Promise<void> {
        await CustomerModel.deleteMany()    
    } 
}
