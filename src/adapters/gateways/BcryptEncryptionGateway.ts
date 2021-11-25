import { EncryptionGateway } from "../../core/gateways/EncryptionGateway";
const bcrypt = require ('bcryptjs');

export class BcryptEncryptionGateway implements EncryptionGateway {
    async encrypt(value: string): Promise<string> {
        return await bcrypt.hash(value, 10);
    }

    async compare(value: string, comparedValue: string): Promise<boolean> {
        return await bcrypt.compare(value, comparedValue); 
    }
    
}