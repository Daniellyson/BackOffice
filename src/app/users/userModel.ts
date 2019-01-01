import { Carpooling } from "../carpooling/carpoolingModel";

export interface User {
    
	//TEST
	/*
    name: string;   
    firstName: string;
    lastName: string;
    completed: boolean;
    */
    
    //Our BD
	id: number;
	userName: string;
	password: string;
	role: string;
	email: string;
	emailValidatedAt: Date;
	gender: string;
	adresse: string;
	facePhotoFilename: string;
	facePhotoSentAt: Date;
	facePhotoValidatedAt: Date;
	identityPieceFilename: string;
	identityPieceSentAt: Date;
	identityPieceValidatedAt: Date;
	phone: string;
	trusted_carpooling_driver_code: string;
	createdAt: Date;
	updatedAt: Date;
	locality: string;
	postalCode: string;
	timestamp: string;

	//carpooling: Carpooling;
	
	/*
        "car": [],
        "carpooling": [],
        "privateMessage": [],
        "trustedCarpoolingDriverCarpoolerNavigation": [],
		"trustedCarpoolingDriverUserNavigation": []
	*/
}