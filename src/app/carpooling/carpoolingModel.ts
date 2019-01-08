import { User } from "../users/userModel";

export interface Carpooling {
    id: number;
    description: string;
    nbPlaces: number;
    placePrice: number;
    car: number;
    creator: string;
    createdAt: Date;
    updateAt: Date;
    dateStart: Date;
    dateEnd: Date;
    destinationFrom: string;
    destinationTo: string;
    localityFrom: string;
    localityTo: string;
    postalCodeTo: string;
    postalCodeFrom: string;
    userName: string;
}

export interface Carpoolings {
    userName: string;
    createdAt: Date;
}