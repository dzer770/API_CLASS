import { Request } from 'express';
import { Identity } from './Identity';

export interface AuthenticatedRequest extends Request {
    user: Identity;
}
