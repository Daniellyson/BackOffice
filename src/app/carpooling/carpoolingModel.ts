
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
    carModel: string;
    owner: string;
}

export interface Car {
    id:	number;
    createdAt:	Date;
    validatedAt: Date;
    color:	string;
    licensePlateNumber:	string;
    carModel: string;
    owner: string;
}