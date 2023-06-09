import { Role } from "./Role";

export class User {
    name?: string;
    cin?: number;
    age?: number;
    address?: string[];
    username?: string;
    password?: string;
    token?: string;
    roles?: Role[];
}