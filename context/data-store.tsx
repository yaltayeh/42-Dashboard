import pb from "@/lib/pocketbase"
import { Qout } from "@/types/data-define"
import { DataResponse } from "@/types/pocketbase-types"
import { useEffect } from "react"
import { create } from "zustand"

export type DataStore = {
  qout?: Qout
  setQout: (qout: Qout) => void
}

export const useDataStore = create<DataStore>()((set) => ({
  qout: {
    qout: "Ask Your Peers",
    writer: "Yacoub Altayeh",
  },
  setQout: (qout) => set(() => ({
    qout: qout
  }))
}))

export function DataProvider({
  children
}: React.ComponentProps<"div">) {
  const { setQout } = useDataStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pb.collection<DataResponse>("data")
          .getFullList()
        data.forEach((record) => {
          switch (record.key) {
            case "Qout": setQout(record.data as Qout); break;
          }
        })
      } catch {

      }
    }
    fetchData()


    pb.collection<DataResponse>("data")
      .subscribe("*", (e) => {
        if (e.action === "create" || e.action === "update") {
          switch (e.record.key) {
            case "Qout": setQout(e.record.data as Qout); break;
          }
        } else if (e.action === "delete") {
          switch (e.record.key) {
            case "Qout":
              setQout({
                qout: "Ask Your Peers",
                writer: "Yacoub Altayeh",
              })
              break
          }
        }
      })
    return (() => {
      (async () => {
        await pb.collection("data").unsubscribe()
      })()
    })
  })


  return (
    <>{children}</>
  )
}