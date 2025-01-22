import { client } from '@/sanity/lib/client';
import ProductListing from '../components/ProductListing';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';
import Field from '../components/Feild';
import Page from '../components/Ourpage';
import ShopLine from '../components/shop';



// Fetch products from Sanity
async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    category,
    "id": _id,
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
  console.log(products)
  return products;

}

const Shop = async () => {
  const products = await fetchProducts();

  return (
  <div>
    <Header />
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

  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {products.map((product:Product) =>(
        <ProductListing product={product}  key={product.id}/>
      ))}     
</div>
        <div className="justify-center mx-auto">
                <Page />
              </div>
              <Field />
            </div>
      
  );
};

export default Shop;
