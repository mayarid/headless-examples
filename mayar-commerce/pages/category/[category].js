import Head from "next/head"; 
import styles from "./category.module.scss";
import { ApolloClient,InMemoryCache } from "@apollo/client";
import { GET_PAYMENT_LINK_PAGE_DEV } from "../../mygraphql/queries"
import Layout from "components/Layout";
// import { useAuth } from "@/firebase/context";
// import { db } from "@/config/firebase";
import Button from "@/components/FilterButton";
import ProductCard from "@/components/ProductCard/product-card";

const getEmoji = {
  payment_request: "💸",
  fundraising: "🧸",
  generic_link: "🎁",
  payme: "💰",
  course: "👨🏽‍🎓",
  webinar: "👨🏽‍💻",
  physical_product:"🕶",
  // clothing: "👚",
  // shoes: "👠",
  // accessories: "👜",
  // activewear: "🤸",
  // gifts_and_living: "🎁",
  // inspiration: "💎",
};

export default function Category({links}) {
  
  const imageNull = 'https://demo-only.mayar.link/digital-product-placeholder.png'
  // const { user, loading } = useAuth();

  // console.log(user, loading);

  const formattedName =
    links[0].type === "gifts_and_living"
      ? "Gifts & Living"
      : links[0].type.toUpperCase()

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className={styles.emoji}>{getEmoji[links[0].type]}</span>
              {formattedName}
            </h1>
            <div className={styles.headerButtons}>
              <Button type="sort" style={{ marginRight: 20 }} />
              <Button count={0} />
            </div>
          </div>
          <div className={styles.products}>
            {
              links.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    status={product.status}
                    name={product.name}
                    image={product.coverImage===null ?imageNull:product.coverImage['url']}
                    price={product.amount}
                    sale_price={product.amount-product.amount*0.5}
                    // favorite={user?.favorites?.includes(product.id)}
                  />
                );
              })}
          </div>
        </main>
      </div>
    </Layout>
  );
}



export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: process.env.MAYAR_HEADLESS_API_URL,
    headers: {
      Authorization: process.env.MAYAR_AUTH_TOKEN,
    },
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: GET_PAYMENT_LINK_PAGE_DEV,
  });

  const paths = data?.getPaymentLinkPageDev?.items?.map((items) => (
    {
      params: {category: items.type.toString()}
    })
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {

  const categories = ctx.params.category
  const client = new ApolloClient({
    uri: process.env.MAYAR_HEADLESS_API_URL,
    headers: {
      Authorization: process.env.MAYAR_AUTH_TOKEN,
    },
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: GET_PAYMENT_LINK_PAGE_DEV,
  });
  
  const prod = data?.getPaymentLinkPageDev?.items;
  const selectedCategory = prod.filter(category=>category.type===categories)
  // const indexProduct = prod?.filter((products) => products.status == "active");
  return {
    props: {
      links: selectedCategory
      // link: data?.getPaymentLinkPageDev?.items,
    },
  };
}

// Category.getInitialProps = async function ({ query }) {


//   let data = {};
//   let error = {};

//   await db
//     .collection("Products")
//     .where("category", "==", query.category.toLowerCase())
//     .get()
//     .then(function (querySnapshot) {
//       const products = querySnapshot.docs.map(function (doc) {
//         return { id: doc.id, ...doc.data() };
//       });
//       data = products;
//     })
//     .catch((e) => (error = e));

//   return {
//     data,
//     error,
//     query,
//   };
// };
