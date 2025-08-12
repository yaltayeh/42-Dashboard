"use client"

import { useDataStore } from "@/context/data-store"

export default function Events() {
  const { events } = useDataStore()

  return (
    <>
      {events?.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
    </>
  )
}