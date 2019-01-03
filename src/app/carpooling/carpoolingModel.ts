import { User } from "../users/userModel";

export interface Carpooling {
    id: number;
    description: string;
    nbPlaces: number;
    placePrice: number;
    createdAt: Date;
    updateAt: Date;
    destinationFrom: string;
    destinationTo: string;
    localityFrom: string;
    localityTo: string;
    postalCodeTo: string;
    postalCodeFrom: string;
    car: number;
    creator: number;
    timestamp: string;
    //TODO
    carNavigation: [{
        id: number;
        createdAt: Date;
        validatedAt: Date;
        color: string;
        licensePlateNumber: string;
        carModel: string;
    }];

    carpoolingApplicant: [{
        carpooling: number;
        user: number;
        hasBeenAccepted: boolean;
    }];

    user: User;
}