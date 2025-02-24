"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Product() {
  const { data, error } = useSWR("https://dummyjson.com/products", fetcher);

  if (error) {
    alert("ERROR IN LOADING PRODUCTS...");
  }

  return (
    <div>
      <h1>PRODUCTS</h1>
      <div>
        {data?.products.map((item: { title: string; description: string; price: number; rating: number; stock: number }, idx: number) => {
          return (
            <div key={idx}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <p>{item.rating}</p>
              <p>{item.stock}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
