import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ShopLine from '../components/shop';
import Field from '../components/Feild';
import Header from '../components/header';
import Page from '../components/Ourpage';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  category: string;
  id: string;
  price: number;
  description: string;
  stockLevel: number;
  imagePath: string;
  discountPercentage: number;
  isFeaturedProduct: number;
  name: string;
  image: any;
}

// Fetch products from Sanity
async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    category,
    _id,
    price,
    description,
    stockLevel,
    imagePath,
    discountPercentage,
    isFeaturedProduct,
    name,
    "image":image.asset._ref
  }`;
  const products = await client.fetch(query);
  return products;
}

const Shop = async () => {
  const products = await fetchProducts();

  return (
    <div className="bg-gray-50">
      <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
        {/* Header Section */}
        <div className="bg-[#faf4f4]">
          <Header />
        </div>

        {/* Banner Section */}
        <div className="relative text-black">
          <Image
            src="/shop.jpeg" // Replace with the correct image file path
            alt="Shop Banner"
            height={400}
            width={1600}
            className="w-full h-40 md:h-auto object-cover"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-5xl font-semibold">
            Shop
          </h1>
          {/* Breadcrumb Section */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14">
            <p className="text-gray-700 text-xs md:text-xl flex items-center">
              <Link href="/" className="font-bold hover:underline">
                Home
              </Link>
              <span className="font-bold mx-2">{'>'}</span>
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
            </p>
          </div>
        </div>

        {/* Shop Line Section */}
        <div className="my-6">
          <ShopLine />
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: Product, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Product Image */}
              <Image
                src={urlFor(product.image).url()} // Convert ImageUrlBuilder to string URL
                alt={product.name}
                height={300}
                width={300}
                className="h-[250px] w-full object-cover"
              />
              <div className="p-4 text-center">
                {/* Product Name */}
                <p className="text-lg font-medium text-gray-800">{product.name}</p>
                {/* Product Price */}
                <h3 className="text-xl font-semibold text-gray-900 mt-2">${product.price}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="justify-center mx-auto">
          <Page />
        </div>
        <Field />
      </div>
    </div>
  );
};

export default Shop;
