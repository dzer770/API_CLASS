import { Customer } from "../aggregates/Customer";

export interface UserRepository {
    findByEmail(email: string): Customer | Promise<Customer>;
    save(customer : Customer): Customer | Promise<Customer>;
    getAll(): Customer[] | Promise<Customer[]>;
    getById(id : string): Customer | Promise<Customer>;
    delete(id : string): void | Promise<void>;
    exist(id: string): boolean | Promise<boolean>;
    update(customer : Customer): void | Promise<void>;
    clear(): void | Promise<void>;
}
