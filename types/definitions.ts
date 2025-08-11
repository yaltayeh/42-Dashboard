import { JSX } from "react"

export type BlockProps = {
  x: number
  y: number
  z: number
  w: number
  h: number
}

export type Block =  {

}

export type BlockFrame = {
  x: number
  y: number
  z: number
  w: number
  h: number
  isBoard?: boolean
  component?: (props: BlockProps) => JSX.Element
}
