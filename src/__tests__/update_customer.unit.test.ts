import { InMemoryUserRepository } from "../adapters/repository/inMemory/UserRepository";
import { UpdateCustomer } from "../core/usecases/UpdateCustomer";
import { Customer } from "../core/aggregates/Customer";


describe('Unit - UpdateCustomer', () => {

    let updateCustomer : UpdateCustomer;
    

    beforeAll(async () => {
        const userRepository = new InMemoryUserRepository();
        await userRepository.save(new Customer({
                firstname : 'dan',
                lastname : 'zerdoun',
                age: 29,
                email : 'znc@zndv.com',
                id : 'zae',
                password : 'fzi'
        }))
        updateCustomer = new UpdateCustomer(
            userRepository
        );
    })

    it ('Should update a customer', async ()=> {
        const result = await updateCustomer.execute({
            firstname : 'dan',
            lastname : 'zerdoun',
            age : 29,
            userId: 'zae'
        });
        expect (result.props.firstname).toEqual('dan')
    })
})
