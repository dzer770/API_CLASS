import { Request } from 'express';
import { Identity } from '../core/aggregates/Identity';

export interface AuthenticatedRequest extends Request {
    user: Identity;
}
