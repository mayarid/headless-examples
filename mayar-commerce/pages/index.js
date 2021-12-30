import { ApolloClient,InMemoryCache } from "@apollo/client";
import { GET_PAYMENT_LINK_PAGE_DEV } from "../mygraphql/queries"
import Head from "next/head";
import styles from "./index.module.scss";

import Button from "components/FilterButton";
import HorizontalCard from "components/HomeCard/horizontal-card";
import VerticalCard from "components/HomeCard/vertical-card";
import Products from "components/HomeProducts";

// import { db } from "config/firebase";
import Layout from "components/Layout";
import { DataCtx } from "helper/DataCtx";

// import { useAuth } from "../firebase/context";

export default function Home({ links }) {
  // const auth = useAuth();
  // console.log(link);
 
  const link = links.filter((products) => products.status == "active");
  const imageNull =
    "https://demo-only.mayar.link/digital-product-placeholder.png";
  return (
    <DataCtx.Provider value={{links}}>
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <div className={styles.header}>
              <h1 className={styles.title}>
                <span className={styles.emoji}>⚡</span>New In
              </h1>
              <div className={styles.headerButtons}>
                <Button type="sort" style={{ marginRight: 20 }} />
                <Button count={0} />
              </div>
            </div>
            <Products>
            <HorizontalCard
              bgColor="#BCE7F0"
              title="Get up to 50% off"
              // image="https://i.ibb.co/wL3nWkm/Pngtree-memphis-style-line-point-line-3797599.png"
                image="https://mayar-assets.s3.ap-southeast-1.amazonaws.com/mayarlogo-small.png"
            />
            <HorizontalCard
              bgColor="#dec8f3"
              // image="https://i.ibb.co/qdY3T5g/kindpng-53319.png"
              image="https://mayar-assets.s3.ap-southeast-1.amazonaws.com/mayarlogo-small.png"
              title="New Product Arrival"
                desc="Best of daily wear"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name={link[0].name}
              image={link[0].coverImage === null ? imageNull:link[0].coverImage.url}
              price={`Rp. ${link[0].amount}`}
              sale_price={`Rp. ${link[0].amount - link[0].amount * 0.5}`}
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name={link[1].name}
              image={link[1].coverImage === null ? imageNull:link[1].coverImage.url}
              price={`Rp. ${link[1].amount}`}
              sale_price={`Rp. ${link[1].amount - link[1].amount * 0.3}`}
            />
          </Products>
          

          <Products reverse>
            <HorizontalCard
              bgColor="#FBE285"
              // image="https://i.ibb.co/fd9gS8p/kisspng-model-fashion-photography-fashion-photography-model-5abb4a53e1f5b0-6067237715222236999256.png"
              image="https://mayar-assets.s3.ap-southeast-1.amazonaws.com/mayarlogo-small.png"
              title="New In Knitwear"
              desc="Layers. On. Layers"
            />
            <HorizontalCard
              bgColor="#F9CADA"
              // image="https://i.ibb.co/db3Ww4J/kisspng-barbara-palvin-fashion-model-5b2b93c8c2c3a8-5507716115295825367978.png"
              image="https://mayar-assets.s3.ap-southeast-1.amazonaws.com/mayarlogo-small.png"
              title="New Season"
              desc="Reflect your style"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name="CoolBrand Blouse"
              name={link[2].name}
              image={link[2].coverImage === null ? imageNull:link[2].coverImage.url}
              price={`Rp. ${link[2].amount}`}
              sale_price={`Rp. ${link[2].amount - link[2].amount * 0.1}`}
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name={link[3].name}
              image={link[3].coverImage === null ? imageNull:link[3].coverImage.url}
              price={`Rp. ${link[0].amount}`}
              sale_price={`Rp. ${link[3].amount - link[3].amount * 0.6}`}
            />
          </Products>
          <Products>
            <HorizontalCard
              bgColor="#99E6B0"
              // image="https://i.ibb.co/0yKq1HK/kindpng-4043322.png"
              image="https://mayar-assets.s3.ap-southeast-1.amazonaws.com/mayarlogo-small.png"
              title="End of season"
              desc="Always sporty"
            />
            <HorizontalCard
              bgColor="#f3e6c8"
              // image="https://i.ibb.co/68XpWPB/pngkey-com-ladies-purse-png-2499694.png"
              image="https://mayar-assets.s3.ap-southeast-1.amazonaws.com/mayarlogo-small.png"
              title="New Accessories"
              desc="Complete your combine"
            />
            <VerticalCard
              bgColor="#f6f6f6"
              name={link[4].name}
              image={link[4].coverImage === null ? imageNull:link[4].coverImage.url}
              price={`Rp. ${link[4].amount}`}
              sale_price={`Rp. ${link[4].amount - link[4].amount * 0.6}`}
            />

            <VerticalCard
              bgColor="#f6f6f6"
              name={link[5].name}
              image={link[5].coverImage === null ? imageNull:link[5].coverImage.url}
              sale_price={`Rp. ${link[5].amount}`}
           
            />
          </Products>
          </main>
        </div>
      </Layout>
    </DataCtx.Provider>
  );
}

export async function getStaticProps() {
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
  // const prod = data?.getPaymentLinkPageDev?.items;
  // const indexProduct = prod?.filter((products) => products.status == "active");
  return {
    props: {
      links: data?.getPaymentLinkPageDev?.items
      // link: data?.getPaymentLinkPageDev?.items,
    },
  };
}

