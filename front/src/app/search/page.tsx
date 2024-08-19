"use client";
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import CardsContainer from '@/components/Products';

const SuspenseSearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div>
      <h1 className="text-xl text-center text-lightblue1 stroke-dv font-bold mb-2 mt-2 md:text-3xl">Search Results</h1>
      <h2 className='text-lg text-center text-white stroke-b md:text-xl'>Results for: {query}</h2>
      <div className='m-4'>
      <CardsContainer searchQuery={query} />
      </div>
    </div>
  );
}

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspenseSearchPage />
    </Suspense>
  );
}

export default SearchPage;