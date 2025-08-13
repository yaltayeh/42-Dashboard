import { login, logout } from "@/lib/action/auth"
import { Button } from "./ui/button"
import { auth } from "@/auth"

export default async function Profile() {
  const session = await auth()

  return (
    <div className="w-full h-full grid text-center p-2 place-content-center">
      {session ? (
        <form action={logout}>
          <Button>
            logout
          </Button>
        </form>
      ) : (
        <form action={login("/")}>
          <Button>
            42 login
          </Button>
        </form>
      )}
    </div>
  )
}
