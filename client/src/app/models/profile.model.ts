import { Address } from './address';

export interface Profile {
    id?: string,
    firstName: string,
    lastName: string,
    range?: number,
    gender:boolean;
    favorite?: string,
    summery?: string,
    maximum?: number,
    minimum?: number,
    age: number,
    address: Address
    phoneNumber?: string,
    image?: string,
    creator?: string
}