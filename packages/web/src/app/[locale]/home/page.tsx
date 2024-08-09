"use client";
import { HomeScreen, add } from "@lfvn-customer/shared";
import React from "react";
import tw from "twrnc";

export default function Home() {
  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <img
          style={tw.style(`absolute`)}
          src="/images/home_bg.png"
          alt="My Image"
        />
        <HomeScreen />
      </div>
    </main>
  );
}
