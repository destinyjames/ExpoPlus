import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_NGROK_URL}/login`, {
            username: credentials.username,
            password: credentials.password,
          });

          // Check if the response has data and a token
          if (res.data && res.data.token) {
            // Return the user object with the username and token
            return {
              // Include any user details you want to be available in the NextAuth session
              // Here, we're including the username and token
              name: res.data.username,
              token: res.data.token,
            };
          }

          // Return null if signing in fails
          return null;
        } catch (error) {
          throw new Error(error.response.data.message || 'Failed to sign in');
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // user parameter is the object we returned from authorize
      if (user) {
        // Pass the token and user details to the token
        token.accessToken = user.token;
        token.name = user.name; // Username from the backend response
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Make the token and user details available in the session
      session.accessToken = token.accessToken;
      session.user.name = token.name; // Ensure the session reflects the user's name
      return session;
    },
  },
  pages: {
    signIn: '/login',  // Your custom sign-in page
  },
});
