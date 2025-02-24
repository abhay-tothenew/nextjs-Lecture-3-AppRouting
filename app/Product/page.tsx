"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Product() {
  const router = useRouter();

  const { data, error } = useSWR("https://dummyjson.com/products", fetcher);

  if (error) {
    alert("ERROR IN LOADING PRODUCTS...");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.productTitle}>PRODUCTS</h1>
      <div className={styles.productInfo}>
        {data?.products.map((item: any, idx: number) => {
          return (
            <div key={idx}>
              <h2 className={styles.productValue}>
                <strong className={styles.productLabel}>TITLE: </strong>
                {item.title}
              </h2>
              <p className={styles.productValue}>
                <strong className={styles.productLabel}>DESCRIPTION: </strong>
                {item.description}
              </p>

              <button
                className={styles.productButton}
                onClick={() => {
                  router.push(`/Product/${item.id}`);
                }}
              >
                VIEW DETAILS
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
