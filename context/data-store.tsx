"use client"

import pb from "@/lib/pocketbase"
import { Event, Qout } from "@/types/data-define"
import { DataKeyOptions, DataResponse } from "@/types/pocketbase-types"
import { useEffect } from "react"
import { create } from "zustand"

export type DataStore = {
  qout?: Qout
  events?: Event[]

  setData: (key: DataKeyOptions, data: any) => void
}

export const useDataStore = create<DataStore>()((set) => ({
  qout: undefined,
  events: undefined,

  setData: (key: DataKeyOptions, data: any) => {
    switch (key) {
      case "Qout": return set(() => ({qout: data}));
      case "Events": return set(() => ({events: data}));
    }
  }

}))

export function DataProvider({
  children
}: React.ComponentProps<"div">) {
  const { setData } = useDataStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pb.collection<DataResponse>("data")
          .getFullList()
        data.forEach((record) => {
          setData(record.key, record.data)
        })
      } catch {

      }
    }
    fetchData()


    pb.collection<DataResponse>("data")
      .subscribe("*", (e) => {
        if (e.action === "create" || e.action === "update") {
          setData(e.record.key, e.record.data)
        } else if (e.action === "delete") {
          setData(e.record.key, null)
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