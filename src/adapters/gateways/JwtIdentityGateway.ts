import { Identity } from "../../core/aggregates/Identity";
import { IdentityGateway } from "../../core/gateways/IdentityGateway";

const jwt = require ('jsonwebtoken');

export class JwtIdentityGateway implements IdentityGateway {
    
    constructor(
        private readonly secret: string,
    ) {

    }    
    async encode(identity: Identity): Promise<string> {
        return await jwt.sign(identity, this.secret);
    }
    async verify(value: string): Promise<Identity> {
        return await jwt.verify(value, this.secret);
    }    
}
