import Link from "next/link";
import styles from "../page.module.css";
export default function Home(){
  return(
    <div className={styles.container}>
      <Link href={'/Product'}>
      PRODUCTS LIST
      </Link>
    </div>
  )
}
