"use client"

import { DataProvider, useDataStore } from "@/context/data-store"

function Test() {
  const { qout } = useDataStore()

  return (
    <div className="w-full h-full grid place-content-center">
      <p>"{qout?.qout}"</p>
      <p>{qout?.writer}</p>
    </div>
  )
}

export default function Qout() {
  return (
    <DataProvider>
      <Test />
    </DataProvider>
  )
}