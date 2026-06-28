// src/App.tsx
import { SpeedInsights } from '@vercel/speed-insights/react';
import LifeSpent from "./LifeSpent";

export default function App() {
  return (
    <>
      <LifeSpent />
      <SpeedInsights />
    </>
  );
}