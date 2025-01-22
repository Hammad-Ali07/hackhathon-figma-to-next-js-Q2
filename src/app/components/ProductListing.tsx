import React from 'react'
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

const ProductListing = ({product}:{product:Product}) => {
 
  return (
    <div>
      
        {/* Banner Section */}
        {/* Product List */}
            <div
              className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <Link href={`Prdouct/${product.id}`}>
              <Image
                src={urlFor(product.image).url()} // Convert ImageUrlBuilder to string URL
                alt={product.name}
                height={300} 
                
                width={300}
                className="h-[250px] w-full object-cover"
              />
              </Link>
              {/* Product Details */}
              <div className="p-4 text-center">
                {/* Product Name */}
                <p className="text-lg font-medium text-gray-800">{product.name}</p>
                {/* Product Price */}
                <h3 className="text-xl font-semibold text-gray-900 mt-2">${product.price}</h3>
              </div>
            </div>
          
        </div>

      
  )
}

export default ProductListing