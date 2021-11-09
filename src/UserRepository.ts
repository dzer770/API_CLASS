
 export type Customer = {
    firstname: string;
    lastname: string;
    age: number;
    id: string;
    password : string;
    email : string
}

export class UserRepository {

    map : Map<string,Customer>

    constructor (){
        this.map = new Map();
}


    save(customer : Customer): Customer { 
        this.map.set(customer.id, customer);
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


    getById(id : string): Customer{
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

    
    update(customer : Customer) {
        if (!this.exist(customer.id)) {
            throw new Error('CUSTOMER_NOT_FOUND');
        }
       this.map.set(customer.id,customer)
    }
     clear(){
         this.map.clear()
     }

}   




