import { Situation } from '../../shared/enum/enum';
import { Authorization } from './authorization.model';

export class UserDetails {
    id: number;
    name: string;
    username: string;
    password: string;
    situation: Situation;
    authorities: Authorization[];
    token?: string;

    constructor(userDetails: UserDetails, token: string) {
        this.id = userDetails.id;
        this.name = userDetails.name;
        this.username = userDetails.username;
        this.password = userDetails.password;
        this.situation = userDetails.situation;
        this.token = token;
    }
}
