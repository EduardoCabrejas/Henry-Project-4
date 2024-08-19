"use client";
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '@/lib/server/fetchProducts';
import { ProductProps } from '../../../interfaces/IProducts';
import ZoomImage from '@/components/ZoomImage';
import Modal from '@/components/Modal';

const Details: React.FC = () => {
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExistsModal, setShowExistsModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const getIdFromPath = () => {
      const path = window.location.pathname;
      const id = path.split('/').pop();
      return id;
    };

    const getProductById = async () => {
      try {
        const products = await fetchProducts();
        const id = getIdFromPath();
        if (id) {
          const productFound = products.find((prod) => prod.id === Number(id));
          setProduct(productFound);
        } else {
          throw new Error('Invalid product ID');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setProduct(undefined);
      }
    };

    getProductById();
  }, []);

  const handleBuyNow = () => {
    if (product) {
      const storedProducts = localStorage.getItem('products');
      let products: ProductProps[] = storedProducts ? JSON.parse(storedProducts) : [];
      const existingProduct = products.find(prod => prod.id === product.id);
      if (existingProduct) {
        setShowExistsModal(true);
        return;
      }
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
      setShowBuyModal(true);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const storedProducts = localStorage.getItem('products');
      let products: ProductProps[] = storedProducts ? JSON.parse(storedProducts) : [];
      const existingProduct = products.find(prod => prod.id === product.id);
      if (existingProduct) {
        setShowExistsModal(true);
        return;
      }
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
      setShowAddModal(true);
    }
  };

  if (product === undefined) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="grid grid-cols-1 p-2 md:grid-cols-2">
      <div className="flex justify-center items-center">
        <ZoomImage src={product.image} alt={product.name}/>
      </div>
      <div className="p-2 border-2 border-darkblue1 m-2 rounded-md">
        <h1 className="text-white text-xl stroke-lb font-bold text-center m-2 md:text-3xl underline">
          {product.name}
        </h1>
        <div className='m-4 text-left stroke-lb text-white font-bold text-xl md:text-2xl'>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
        <div className='flex flex-col justify-center w-3/4 m-auto md:w-3/4'>
          {token ? (
            <>
              <button
                className="rounded-lg m-1 p-1 h-10 text-lightblue1 text-xl text-center bg-darkblue1 border-2 border-darkviolet font-bold"
                onClick={handleBuyNow}
              >
                Buy now
              </button>
              <button
                className="rounded-lg m-1 p-1 h-10 text-darkblue2 bg-lightblue1 border-2 border-lightviolet font-semibold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </>
          ) : (
            <p className="w-full bg-darkblue2 border-2 border-lightblue1 p-2 text-center text-white text-lg md:text-xl">Once you have created your account and logged in, you will be able to add and purchase this product</p>
          )}
        </div>
        <h2 className='m-2 text-lightblue1 stroke-dv font-bold text-left underline text-xl md:text-2xl'>Description:</h2>
        <p className="m-2 text-white text-sm md:text-lg">{product.description}</p>
      </div>
      <Modal
        isOpen={showBuyModal}
        onConfirm={() => {
          setShowBuyModal(false);
          window.location.href = '/checkout';
        }}
        onClose={() => setShowBuyModal(false)}
        context="buy"
      />
      <Modal
        isOpen={showAddModal}
        onConfirm={() => {
          setShowAddModal(false);
        }}
        onClose={() => setShowAddModal(false)}
        context="addProduct"
      />
      <Modal
        isOpen={showExistsModal}
        onClose={() => setShowExistsModal(false)}
        context="productExist"
      />
    </div>
  );
}

export default Details;
