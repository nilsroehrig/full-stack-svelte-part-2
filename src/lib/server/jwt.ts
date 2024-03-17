import { JWT_EXPIRATION_TIME, JWT_SECRET } from '$env/static/private';
import { SignJWT, jwtVerify } from 'jose';

export type JWTPayload = {
	id: number;
	email: string;
	username: string;
};

const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export function createToken(payload: JWTPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS512' })
		.setExpirationTime(JWT_EXPIRATION_TIME)
		.sign(encodedSecret);
}

export async function verifyToken(token: string) {
	try {
		const { payload } = await jwtVerify<JWTPayload>(token, encodedSecret);
		return payload;
	} catch (e) {
		throw new JWTVerificationError();
	}
}

export class JWTVerificationError extends Error {
	name = 'InvalidTokenError';
}
