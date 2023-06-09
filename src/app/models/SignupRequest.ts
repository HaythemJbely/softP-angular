import { User } from "./User";

export class SignupRequest {
    username?: string;
    email?: string;
    roles?: string[];
    password?: string;
    user?: User;
}