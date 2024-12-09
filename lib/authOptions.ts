import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prismaConnect';
import fetch from 'node-fetch';
import { getServerSession } from 'next-auth';

const scopes = ['user-read-email', 'user-library-read'].join(',');

const params = {
  response_type: 'code',
  client_id: process.env.SPOTIFY_CLIENT_ID as string,
  scope: scopes,
  redirect_uri: 'http://localhost:3000/api/auth/callback/spotify',
  //state: 'your_state_here'
};

const LOGIN_URL =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams(params).toString();

// @ts-expect-error token any type
async function refreshAccessToken(token) {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', token.refreshToken);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET
        ).toString('base64'),
    },
    body: params,
  });
  const data = await response.json();
  return {
    ...token,
    // @ts-expect-error data type unknown
    accessToken: data.access_token,
    // @ts-expect-error data type unknown
    refreshToken: data.refresh_token ?? token.refreshToken,
    // @ts-expect-error data type unknown
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: LOGIN_URL,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization:
        'https://accounts.google.com/o/oauth2/auth?response_type=code&hd=gmail.com'
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account) {
        if (account.provider === 'google') {
          // Only allow specific Google accounts
          const allowedGoogleEmails = process.env.ALLOWED_GOOGLE_EMAILS?.split(',');
           // @ts-expect-error allowedGoogleEmails is possibly undefined
          if (user && user.email && allowedGoogleEmails.includes(user.email)) {
            return true;
          } else {
            return false; // Deny login for this account
          }
        }
      }
      return true;
    },
    async jwt({ user, token, account }) {
      console.log('JWT Callback:', { token, account });
    
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        console.log('Account Object:', account); 
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
    
        // Ensure that `expires_at` is a number
        if (typeof token.accessTokenExpires === 'string') {
          token.accessTokenExpires = Number(token.accessTokenExpires);
        }
      }
    
      // If the access token has not expired, return the token
      if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number) * 1000) {
        return token;
      }
    
      // If the access token has expired, refresh it
      if (token.refreshToken) {
        return await refreshAccessToken(token);
      }
    
      // If no valid token, return the current token (even if it's incomplete)
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback:', { session, token });
      // Send properties to the client, like an access_token from a provider.
      if (token && token.accessToken) {
        // @ts-expect-error accessToken doesnt exist on session
        session.accessToken = token.accessToken;
      } else {
        console.error('Token is undefined or missing accessToken');
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax', // SameSite should be 'lax' or 'strict' for security
        path: '/',
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        path: '/',
        httpOnly: true,
      },
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
