import axios from 'axios';
import {serialize} from 'cookie';
import dayjs from 'dayjs';
import type {RESTGetAPIUserResult} from 'discord-api-types/v10';
import {sign} from 'jsonwebtoken';
import type {NextApiHandler} from 'next';
import urlcat from 'urlcat';
import {env} from '../../server/constants';

// Configuration constants
const {CLIENT_ID, CLIENT_SECRET, JWT_SECRET, REDIRECT_URI} = env;

// Scopes we want to be able to access as a user
const scope = ['identify'].join(' ');

// URL to redirect to outbound (to request authorization)
const OAUTH_URL = urlcat('https://discord.com/api/oauth2/authorize', {
	client_id: CLIENT_ID,
	redirect_uri: REDIRECT_URI,
	response_type: 'code',
	scope,
});

/**
 * Exchanges an OAuth code for a full user object
 * @param code The code from the callback querystring
 */
async function exchangeCode(code: string) {
	const body = new URLSearchParams({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		redirect_uri: REDIRECT_URI,
		grant_type: 'authorization_code',
		code,
		scope,
	}).toString();

	const {data: auth} = await axios.post<{access_token: string; token_type: string}>(
		'https://discord.com/api/oauth2/token',
		body,
		{headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
	);

	const {data: user} = await axios.get<RESTGetAPIUserResult>('https://discord.com/api/users/@me', {
		headers: {Authorization: `Bearer ${auth.access_token}`},
	});

	return {user, auth};
}

/**
 * Generates the set-cookie header value from a given JWT token
 */
function getCookieHeader(token: string) {
	return serialize('token', token, {
		httpOnly: true,
		path: '/',
		secure: process.env.NODE_ENV !== 'development',
		expires: dayjs().add(1, 'day').toDate(),
		sameSite: 'lax',
	});
}

const handler: NextApiHandler<never> = async (req, res) => {
	// Find our callback code from req.query
	const {code = null} = req.query as {code?: string};

	// If it doesn't exist, we need to redirect the user
	// so that we can get the code
	if (typeof code !== 'string') {
		res.redirect(OAUTH_URL);
		return;
	}

	// Exchange the code for a valid user object
	const {user} = await exchangeCode(code);

	// Sign a JWT token with the user's details
	// encoded into it
	const token = sign(user, JWT_SECRET, {expiresIn: '24h'});

	// Serialize a cookie and set it
	const cookie = getCookieHeader(token);
	res.setHeader('Set-Cookie', cookie);

	// Redirect the user to wherever we want
	// in our application
	res.redirect('/demos/serverless-discord-oauth');
};

export default handler;
