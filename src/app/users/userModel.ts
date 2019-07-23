import { Carpooling } from "../carpooling/carpoolingModel";

export class User {
     
	id: string;
	userName: string;
	password: string;
	role: string;
	email: string;
	emailValidatedAt: Date;
	gender: string;
	address: string;
	facePhotoFilename: string;
	facePhotoSentAt: Date;
	facePhotoValidatedAt: Date;
	identityPieceFilename: string;
	identityPieceSentAt: Date;
	identityPieceValidatedAt: Date;
	phone: string;
	trustedCarpoolingDriverCode: string;
	createdAt: Date;
	updatedAt: Date;
	locality: string;
	postalCode: string;
	timestamp: string;

	carpooling: Carpooling[];
}