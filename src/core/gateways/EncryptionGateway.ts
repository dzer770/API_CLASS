export interface EncryptionGateway {
    encrypt(value: string): Promise<string>;
    compare(value: string, comparedValue: string): Promise<boolean>;
}