import React from "react";
// import { ApolloClient,InMemoryCache } from "@apollo/client";
// import { GET_PAYMENT_LINK_PAGE_DEV } from "../../mygraphql/queries"


import styles from "./layout.module.scss";
import Header from "../Header";
import CategoriesBar from "components/Categories";


export default function Layout({children, noCategories }) {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>
          {!noCategories && <CategoriesBar/>}
          {children}
        </div>
      </div>
    </div>
  );
}


// export async function getStaticProps() {
//   const client = new ApolloClient({
//     uri: process.env.MAYAR_HEADLESS_API_URL,
//     headers: {
//       Authorization: process.env.MAYAR_AUTH_TOKEN,
//     },
//     cache: new InMemoryCache(),
//   });
//   const { data } = await client.query({
//     query: GET_PAYMENT_LINK_PAGE_DEV,
//   });
//   // const prod = data?.getPaymentLinkPageDev?.items;
//   // const indexProduct = prod?.filter((products) => products.status == "active");
//   return {
//     props: {
//       links: data?.getPaymentLinkPageDev?.items
//       // link: data?.getPaymentLinkPageDev?.items,
//     },
//   };
// }