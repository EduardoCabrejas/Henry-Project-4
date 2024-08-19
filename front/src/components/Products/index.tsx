/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CardProps } from "./types";
import { fetchProducts } from "../../lib/server/fetchProducts";

const Card: React.FC<CardProps> = ({
  id,
  name,
  // description,
  price,
  stock,
  image,
}) => {
  return (
    <div className="bg-darkviolet flex flex-col border border-lightblue1 p-3 rounded-lg shadow-lg">
      <img src={image} alt={name} width={250} height={200} className="m-auto" />
      <h2 className="text-xl font-semibold text-center m-2 md:text-2xl">
        {name}
      </h2>
      {/* <p className="text-white h-30 md:h-40">{description}</p> */}
      <div className="bg-lightviolet border-2 border-darkblue1 text-white text-xl stroke-dv m-auto rounded-md p-1 text-center font-bold md:text-2xl">
        <p>Price: ${price}</p>
        <p >Stock: {stock}</p>
      </div>
      <Link href={`/details/${id}`} className="mt-4 bg-darkblue2 border-2 border-lightblue2 text-center p-1 rounded-md">
        Details
      </Link>
    </div>
  );
};

interface CardsContainerProps {
  searchQuery?: string | null;
}

const CardsContainer: React.FC<CardsContainerProps> = ({ searchQuery = "" }) => {
  const [data, setData] = useState<CardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        if (searchQuery) {
          const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setData(filteredProducts);
        } else {
          setData(products);
        }
      } catch (error) {
        setError("Error fetching products");
      }
    };
    getProducts();
  }, [searchQuery]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(({ id, name, description, price, stock, image }) => (
        <Card
          key={id}
          id={id}
          name={name}
          description={description}
          price={price}
          stock={stock}
          image={image}
        />
      ))}
    </div>
  );
};

export default CardsContainer;