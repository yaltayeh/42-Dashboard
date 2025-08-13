import NextAuth from "next-auth"
import { StudentsRolesOptions } from "./pocketbase-types"

declare module "next-auth" {
  interface Session {
    user: {
      student_id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
      roles?: StudentsRolesOptions[] | null
    }
  }

  interface User {
    student_id?: string | null
    roles?: StudentsRolesOptions[] | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: StudentsRolesOptions[] | null
  }
}
