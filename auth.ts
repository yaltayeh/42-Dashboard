import NextAuth from "next-auth"
import FortyTwo from "next-auth/providers/42-school"
import pb from "@/lib/pocketbase"
import { StudentsRecord, StudentsRolesOptions } from "@/types/pocketbase-types";

declare const process: {
  env: {
    AUTH_42_SCHOOL_ID?: string;
    AUTH_42_SCHOOL_SECRET?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    FortyTwo({
      clientId: process.env.AUTH_42_SCHOOL_ID || "",
      clientSecret: process.env.AUTH_42_SCHOOL_SECRET || ""
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        console.log(account)
        try {
          const record = await pb.collection<StudentsRecord>("students")
            .getList(1, 1, { filter: `account_id = '${account.providerAccountId}'` })
          if (record.items.length > 0) {
            const student = record.items[0]
            token.student_id = student.id
            token.roles = student.roles
            await pb.collection<StudentsRecord>("students")
              .update(student.id, {
                name: profile?.usual_full_name || student.name,
                username: profile?.login || student.username,
                image: (profile?.image && typeof profile.image === "object" && "link" in profile.image)
                  ? (profile.image as { link?: string }).link
                  : student.image,
                roles: student.roles || ["Student"],
                account: account,
                account_id: account.providerAccountId,
              })
          } else if (profile) {
            const student = await pb.collection<StudentsRecord>("students")
              .create({
                name: profile.usual_full_name,
                username: profile.login,
                image: (profile.image && typeof profile.image === "object" && "link" in profile.image)
                  ? (profile.image as { link?: string }).link
                  : undefined,
                roles: ["Student"],

                account: account,
                account_id: account.providerAccountId,
              })
            token.student_id = student.id
            token.roles = student.roles
          }
        } catch {
          token.student_id = undefined
          token.roles = ["Student"]
        }
      } 
      // else {
      //   token.student_id = undefined
      //   token.roles = []
      // }
      console.log(Date.now(), token.exp || 0 * 1000 ,token)
      return token
    },
    async session({ session, token }) {
      if (token.roles) {
        session.user.student_id = token.student_id as string | undefined // Add student_id to session user
        session.user.roles = token.roles as StudentsRolesOptions[] // Add roles to session user
      }
      return session
    },
  },
})
