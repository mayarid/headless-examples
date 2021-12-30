import styles from "./categories.module.scss";
import Link from "next/link";
import HelpIcon from "@/icons/help";
// import { DataCtx } from "../../helper/DataCtx";
// import { useContext, useState } from "react";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { GET_PAYMENT_LINK_PAGE_DEV } from "../../mygraphql/queries";

const CategoryItem = ({ name, link, emoji }) => {
  return (
    <li className={styles.categoryItem}>
      <Link href={link || "/"}>
        <a>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default function CategoriesBar() {

  const getEmoji = {
    payment_request: "💸",
    fundraising: "🧸",
    generic_link: "🎁",
    payme: "💰",
    course: "👨🏽‍🎓",
    webinar: "👨🏽‍💻",
    physical_product:"🕶",
  };
  const categories = [
    "physical_product",
    "webinar",
    "course",
    "payme",
    "generic_link",
    "fundraising",
    "payment_request",
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore</h2>
      <ul className={styles.categories}>
        {/* <CategoryItem name="New In" emoji="⚡" link="/" />
        <CategoryItem name="Clothing" emoji="👚" link="/category/clothing" />
        <CategoryItem name="Shoes" emoji="👠" link="/category/shoes" />
        <CategoryItem
          name="Accessories"
          emoji="👜"
          link="/category/accessories"
        />
        <CategoryItem
          name="Activewear"
          emoji="🤸"
          link="/category/activewear"
        /> */}
        {/* <CategoryItem
          name="Gifts & Living"
          emoji="🎁"
          link="/category/gifts_and_living"
        /> */}
        {categories.map(category=>(<CategoryItem
          key={category}
          name={category}
          brand={category}
          emoji={getEmoji[category]}
          link={`/category/${category}`}
        />))}
        
      </ul>
      <div className={styles.helpContainer}>
        <div className={styles.helpIcon}>
          <HelpIcon width={18} height={18} />
        </div>
        <span>Help Center</span>
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
