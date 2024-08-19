import HomePage from "./home/page";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="text-xl text-center m-auto text-lightblue1 stroke-dv font-bold mb-4 md:text-3xl">Loading products...</div>}>
        <HomePage />
      </Suspense>
    </main>
  );
}
