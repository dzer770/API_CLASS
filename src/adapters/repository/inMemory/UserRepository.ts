import { Customer } from "../../../core/aggregates/Customer";
import { UserRepository } from "../../../core/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {

    map : Map<string,Customer>;

    constructor (){
        this.map = new Map();
    }

    findByEmail(email: string): Customer {
        let user: Customer = null;
        const customers = this.map.values();
        for(const customer of customers) {
            if (customer.props.email === email) {
                user = customer;
                break;
            }
        }
        if (!user) {
           throw new Error('USER_NOT_FOUND');
        }
        return user;
    }


    save(customer : Customer): Customer { 
        this.map.set(customer.props.id, customer);
        return customer;
    }


    getAll(): Customer[] {
        const values = [];
        const customers = this.map.values();
        for(const customer of customers) {
            values.push(customer);
        }
        return values;
    }


    getById(id : string): Customer {
        const customer = this.map.get(id);
        if (!customer) {
            throw new Error('CUSTOMER_NOT_FOUND');
        }
        return customer
    }


    delete(id : string): void { 
        this.map.delete(id);
    }

    exist(id: string): boolean {
        const customer = this.map.get(id);
        return customer != null;
    }

    
    update(customer : Customer): void {
        if (!this.exist(customer.props.id)) {
            throw new Error('CUSTOMER_NOT_FOUND');
        }
       this.map.set(customer.props.id,customer)
    }

     clear(): void {
         this.map.clear()
     }
}   




