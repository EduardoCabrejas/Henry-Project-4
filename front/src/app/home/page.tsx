import React, { Suspense } from "react";
import CardsContainer from "@/components/Products";

const SuspenseHomePage: React.FC = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-xl text-center m-auto text-lightblue1 stroke-dv font-bold mb-4 md:text-3xl">Products</h1>
    <Suspense fallback={<div className="text-xl text-center m-auto text-lightblue1 stroke-dv font-bold mb-4 md:text-3xl">Loading products...</div>}>
      <CardsContainer />
    </Suspense>
  </div>
);

export default SuspenseHomePage;
