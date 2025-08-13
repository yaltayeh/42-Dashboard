import { Account } from "next-auth"
import { LayoutsResponse, StudentsRecord } from "./pocketbase-types"
import { ComponentsOptions } from "@/components/components-map"

export type BlockProps = {
  x: number
  y: number
  z: number
  w: number
  h: number
}

export type Block =  {
  x?: number
  y?: number
  z?: number
  w?: number
  h?: number
  component?: ComponentsOptions
  isBoard?: boolean
}

export type Layout = LayoutsResponse<Block[]>

export type Student = StudentsRecord<Account | null>
