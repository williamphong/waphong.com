import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { cache } from 'react';
import { nextCookies } from 'better-auth/next-js';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

export const auth = betterAuth({
  /*
    debug: true,
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24 * 1, // 1 day (every 1 day the session expiration is updated)
        cookieCache:{
            enabled: true,
            strategy: 'jwt',
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },
    accounts:{fields: {
            accountId: "providerAccountId",
            refreshToken: "refresh_token",
            accessToken: "access_token",
            accessTokenExpiresAt: "access_token_expires",
            idToken: "id_token",
        }},
    */
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [nextCookies()],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ['https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'],
      session:{
        provider: "google"
      }
    },
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    },
  },
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
