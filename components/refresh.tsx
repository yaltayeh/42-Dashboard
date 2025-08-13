"use client"

import { useEffect } from "react"
import { pb } from "@/lib/pocketbase"

export default function Refresh() {
  useEffect(() => {
    try {
      pb.collection("layouts").subscribe("*", e => {
        window.location.reload()
      })
      return (() => {
        (async () =>
          await pb.collection("layouts").unsubscribe("*")
        )()
      })
    } catch (e) {
      console.log("Error:", e)
    }
  }, [])

  return (
    <></>
  )
}
