import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;  // Make these optional as they may not always be available
    refreshToken?: string;
    provider?:string;
  }
  interface Token {
    accessToken: string;
    refreshToken: string;
    id: string;
    provider?:string;
  }
}
