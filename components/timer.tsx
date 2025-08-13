"use client"

import { useEffect, useRef, useState } from "react"

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export function Timer() {
  const [time, setTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime + 1));
    }, 1000); // Interval of 1 second
    // Cleanup function to clear the interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []); // Dependencies array to rerun the effect

  return (
		<div className="w-full h-full grid place-content-center">
      {formatTime(time)}      
    </div>
  )  
}
