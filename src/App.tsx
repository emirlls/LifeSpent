// src/App.tsx
import { SpeedInsights } from '@vercel/speed-insights/react';
import LifeSpent from "./features/lifespent/LifeSpent";
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