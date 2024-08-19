import { CardProps } from "../../components/Products/types";

export const fetchProducts = async (): Promise<CardProps[]> => {
  const response = await fetch('http://localhost:3001/products');
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const products: CardProps[] = await response.json();
  return products;
};