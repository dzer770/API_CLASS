
import { BcryptEncryptionGateway } from "../adapters/gateways/BcryptEncryptionGateway";
import { InMemoryUserRepository } from "../adapters/repository/inMemory/UserRepository";
import { Customer } from "../core/aggregates/Customer";
import { GetCustomerById } from "../core/usecases/GetCustomerById";

describe('Unit - GetCustomerById', () => { 

   let getById : GetCustomerById;


    beforeAll(async () => {
        const userRepository = new InMemoryUserRepository();
        const encryptionGateway = new BcryptEncryptionGateway();
        await userRepository.save(new Customer({
            firstname : 'dan',
            lastname : 'zerdoun',
            age: 29,
            email : 'znc@zndv.com',
            id : 'zae',
            password : 'fzi'
        }))
        getById = new GetCustomerById(
            userRepository,
        );
    })
   
    it('Should get a customer by his ID', async () => {
        const result = await getById.execute({
            userId: 'zae'
        });
        expect(result.props.firstname).toEqual('dan');
    })
})













