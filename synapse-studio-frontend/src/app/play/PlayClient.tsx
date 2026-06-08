"use client";

import dynamic from "next/dynamic";

const PlayCanvas = dynamic(() => import("./PlayCanvas"), { ssr: false });

export function PlayClient() {
  return <PlayCanvas />;
}
