import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.Google_CLIENT_ID,
      clientSecret: process.env.Google_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages:{
      signIn:'/auth/signin',
  },
  callbacks:{
      async session({session,token,user}){
          session.user.username=session.user.name
          .split(' ')
          .join('')
          .toLocaleLowerCase()

          session.user.uid=token.sub                   // we get the token from the google
          return session
      }
  }

})