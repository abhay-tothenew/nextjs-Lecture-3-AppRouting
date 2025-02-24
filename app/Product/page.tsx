"use client";
import useSWR from "swr";
import styles from "./Products.module.css";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Product() {
  const { data, error } = useSWR("https://dummyjson.com/products", fetcher);

  if (error) {
    alert("ERROR IN LOADING PRODUCTS...");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>PRODUCTS</h1>
      <div>
        {data?.products.map(
          (
            item: { title: string; description: string; price: number; rating: number; stock: number },
            idx: number
          ) => {
            return (
              <div key={idx} className={styles.card}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.price}>Price: ${item.price}</p>
                <p className={styles.rating}>Rating: {item.rating}</p>
                <p className={styles.stock}>Stock: {item.stock}</p>
                <Link href = {`/Product/${idx+1}`} className={styles.link}>
                READ MORE
                </Link>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
