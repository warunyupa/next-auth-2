import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
     
      name: 'Credentials',
     
      credentials: {
        username: { label: "Username", type: "text",},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        const res = await fetch("https://www.melivecode.com/api/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
  
        if (data.status == 'ok') {
          return data.user
        }
        return null
      }
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token, user,account }) {
      console.log(user)
      if (account) {
        token.accessToken = account.access_token
        token.user = user
      }
      return token
    },
    async session({ session, token, user }) {
      
      session.accessToken = token.accessToken
      session.user = token.user
      return session
    }
  }
}

export default NextAuth(authOptions)