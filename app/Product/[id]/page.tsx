import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products.map((product: {id:number}) => {
    return {
      id: product.id.toString(),
    };
  });
}

export default async function ProductPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const product = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await product.json();
    
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 hover:text-gray-900 transition-colors">
          PRODUCTS DETAILS
        </h2>
        
        <div className="space-y-4">
          <div className="group p-4 rounded-md hover:bg-gray-50 transition-colors">
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 min-w-24">TITLE:</span>
              <span className="text-gray-600 group-hover:text-gray-800">{result.title}</span>
            </p>
          </div>
  
          <div className="group p-4 rounded-md hover:bg-gray-50 transition-colors">
            <p className="flex items-start">
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 min-w-24">DESC:</span>
              <span className="text-gray-600 group-hover:text-gray-800">{result.description}</span>
            </p>
          </div>
  
          <div className="group p-4 rounded-md hover:bg-gray-50 transition-colors">
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 min-w-24">PRICE:</span>
              <span className="text-lg font-medium text-green-600 group-hover:text-green-700">
                ${result.price}
              </span>
            </p>
          </div>
  
          <div className="group p-4 rounded-md hover:bg-gray-50 transition-colors">
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 min-w-24">RATING:</span>
              <span className="flex items-center">
                <span className="text-yellow-500">{result.rating}</span>
              </span>
            </p>
          </div>
  
          <div className="group p-4 rounded-md hover:bg-gray-50 transition-colors">
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 min-w-24">STOCK:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.stock > 0 
                  ? 'bg-green-100 text-green-800 group-hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 group-hover:bg-red-200'
              }`}>
                {result.stock > 0 ? `${result.stock} in stock` : 'Out of stock'}
              </span>
            </p>
          </div>
        </div>
  
        <Link href="/Product" className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center block"
          aria-disabled={result.stock === 0}>
          Add to Cart
        </Link>
      </div>
    );
  }