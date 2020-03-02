import { Coordinates } from './coordinates'
export interface Address {
    id?:string;
    city: string;
    coordinates: Coordinates;
}