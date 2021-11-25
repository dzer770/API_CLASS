import { Identity } from "../aggregates/Identity";

export interface IdentityGateway {
    encode(identity: Identity): Promise<string>;
    verify(value: string): Promise<Identity>;
}