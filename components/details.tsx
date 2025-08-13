import { BlockProps } from "@/types/definitions";

export function Details({
  x,
  y,
  z,
  w,
  h
}: BlockProps) {
  return (
    <div className="w-full h-full grid place-content-center">
      <span> x: {x} </span>
      <span> y: {y} </span>
      <span> z: {z} </span>
      <span> w: {w} </span>
      <span> h: {h} </span>
    </div>
  )
}
