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
  debug:true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  //adapter: PrismaAdapter(prisma),
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
    async jwt({ token, account, profile }) {
      console.log('JWT Callback:', { token, account });
    
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        //@ts-expect-error undefined
        token.id = profile.id
        token.provider = account.provider;
      }
      return token
    },
    async session({ session, token, user }) {
      console.log('Session Callback:', { session, token });
    
      if (token && token.accessToken) {
        // @ts-expect-error Type '{}' is not assignable to type 'string'.
        session.provider = token.provider || "unknown";
        // @ts-expect-error Type '{}' is not assignable to type 'string'.
        session.accessToken = token.accessToken ?? ''; // Ensure default value
        // @ts-expect-error Type '{}' is not assignable to type 'string'.
        session.refreshToken = token.refreshToken ?? ''; // Ensure default value

      } else {
        console.error('Token is undefined or missing accessToken');
      }
    
      return session;
    },

  },
};

export const getAuthSession = () => getServerSession(authOptions);
