import { UserDetails } from './user.model';

export class Response<T> {
    data: T;
    userDetails: UserDetails;
    errors: string[];
}
