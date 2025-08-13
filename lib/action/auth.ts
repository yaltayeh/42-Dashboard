import { signIn, signOut } from "@/auth";

export const login = (redirectTo: string) => {
  return async () => {
    "use server"
    await signIn("42-school", { redirectTo: redirectTo })
  }
}

export const logout = async () => {
  "use server"
  await signOut({ redirectTo: "/" })
}
