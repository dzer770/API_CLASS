import { BcryptEncryptionGateway } from "../adapters/gateways/BcryptEncryptionGateway";
import { InMemoryUserRepository } from "../adapters/repository/inMemory/UserRepository";
import { CreateUser } from "../core/usecases/CreateUser"

describe('Unit - CreateUser', () => {
    let createUser: CreateUser;

    beforeAll(() => {
        const userRepository = new InMemoryUserRepository();
        const encryptionGateway = new BcryptEncryptionGateway();

        createUser = new CreateUser(
            encryptionGateway,
            userRepository,
        );
    })

    it('Should create a user', async () => {
        const result = await createUser.execute({
            firstname: 'dan',
            lastname: "poazke",
            age: 4,
            email: "apzoek@pazlek.com",
            password: "apzoek"
        });
        expect(result.props.age).toEqual(4);
    })
})

