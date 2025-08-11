import { JSX } from "react"
import { LayoutsResponse } from "./pocketbase-type"

export type BlockProps = {
  x: number
  y: number
  z: number
  w: number
  h: number
}

export enum ComponentsOptions  {
  "Detils" = "Detils",
  "Timer" = "Timer",
  "Refresh" = "Refresh",
  "Soon" = "Soon"
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
