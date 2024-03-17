import { randomBytes } from 'crypto';
import fs from 'fs/promises';

const secret = randomBytes(172).toString('hex');
const expirationTime = '1h';

fs.writeFile(
	'./.env',
	`
JWT_SECRET="${secret}"
JWT_EXPIRATION_TIME="${expirationTime}"
MAIN_USER_EMAIL="wilhelm.kowalski@example.com"
MAIN_USER_PASSWORD="kowalski"
MAIN_USER_NAME="wk"
SECONDARY_USER_EMAIL="marlene.dittmer@example.com"
SECONDARY_USER_PASSWORD="dittmer"
SECONDARY_USER_NAME="marlene"
`
)
	.then(() => console.log('Secret and expiration time written to .env file'))
	.catch((err) => console.log(err));
