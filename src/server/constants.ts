import {envsafe, str, url} from 'envsafe';

export const env = envsafe({
	CLIENT_ID: str({
		desc: 'Discord client iD',
	}),
	CLIENT_SECRET: str({
		desc: 'Discord client secret',
	}),
	REDIRECT_URI: url({
		devDefault: 'http://localhost:3000/api/oauth',
		desc: 'Discord OAuth redirect URL',
	}),
	JWT_SECRET: str({
		desc: 'The secret to sign JWT tokens with',
	}),
});
