// src/App.tsx
import { SpeedInsights } from '@vercel/speed-insights/react';
import LifeSpent from "./LifeSpent";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <>
      <LifeSpent />
      <SpeedInsights />
      <Analytics />
    </>
  );
}