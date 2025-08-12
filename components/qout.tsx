"use client"

import { useDataStore } from "@/context/data-store"

export default function Qout() {
  const { qout } = useDataStore()

  return (
    <div className="w-full h-full grid place-content-center">
      <p>"{qout?.qout}"</p>
      <p>{qout?.writer}</p>
    </div>
  )
}
