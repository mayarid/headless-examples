import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_PAYMENT_LINK_PAGE_DEV } from "../../mygraphql/queries";

// import { db } from "@/config/firebase";
// import { useAuth } from "@/firebase/context";
// import { useCart } from "hooks/cart.hook";
// import { removeFavorite, addFavorite, addToCart } from "@/firebase/product";

import styles from "./product.module.scss";

import Layout from "components/Layout";
import Button from "@/components/Button";
import HeartIcon from "@/icons/heart";
import HeartFilled from "@/icons/heart-filled";
import ErrorPage from "pages/404";
import { useRouter } from "next/router";

export default function Product({links}) {
  
  if (!links[0].id) {
    return <ErrorPage />;
  }

  console.log(links[0].id);

  // const [selectedSize, setSelectedSize] = useState();
  // const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isFavorite, setFavorite] = useState(false);

  // const { user, loading } = useAuth();

  const router = useRouter();

  const imageNull = 'https://demo-only.mayar.link/digital-product-placeholder.png';

  // const {
  //   brand,
  //   cover_photo,
  //   information,
  //   photos,
  //   price,
  //   product_name,
  //   sale_price,
  //   sizes,
  // } = data;

  // const id = query?.product;

  // useEffect(() => {
  //   user && setFavorite(user.favorites.includes(id));
  // }, [user]);

  // const removeEvent = (id) => {
  //   removeFavorite(id);
  //   setFavorite(false);
  // };
  const addEvent = () => {
    // addFavorite();
    setFavorite(!isFavorite);
  };

  const checkoutHandler = () => {
    router.push(`${links[0].invoiceUrl}`)
  }
  // const favoriteEvent = () => {
  //   user
  //     ? isFavorite
  //       ? removeEvent(id)
  //       : addEvent(id)
  //     : typeof window !== "undefined" && router.push("/login");
  // };

  // const cart = useCart().data;

  // console.log(cart);

  // const addCartEvent = () => {
  //   if (!user && !loading && typeof window !== "undefined")
  //     router.push("/login");
  //   else {
  //     if (selectedSize) {
  //       const newCart = {
  //         ...cart,
  //         [id]: cart.hasOwnProperty(id)
  //           ? [...cart[id], selectedSize]
  //           : [selectedSize],
  //       };
  //       addToCart(newCart);
  //     }
  //     if (sizes?.length === 0) {
  //       const newCart = {
  //         ...cart,
  //         [id]: cart.hasOwnProperty(id) ? [...cart[id], "-"] : ["-"],
  //       };
  //       addToCart(newCart);
  //     }
  //   }
  // };

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.photosContainer}>
            <div className={styles.carouselContainer}>
              <img src={links[0].coverImage===null ?imageNull:links[0].coverImage['url']} loading="lazy" />
            </div>
            {/* <div className={styles.smallPhotos}>
              {photos.slice(0, 5).map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    className={styles.smallPhoto}
                    style={{ borderColor: selectedPhoto === index && "black" }}
                    onClick={() => setSelectedPhoto(index)}
                    loading="lazy"
                  />
                );
              })}
            </div> */}
            <hr />
          </div>
          <div className={styles.productInfos}>
            <div className={styles.header}>
              <h1 className={styles.productTitle}>{links[0].name|| ""}</h1>
              <Link href={`/brand/${links[0].status}`}>{links[0].status || ""}</Link>
            </div>
            <span className={styles.priceText}>{links[0].amount|| 0}$</span>
            <div className={styles.saleContainer}>
              <span className={styles.saleText}>{links[0].amount - links[0].amount*0.1 || 0}$</span>
              <span className={styles.savedText}>
                {"(You will be saved " + (links[0].amount*0.1) + "$!)"}
              </span>
            </div>
            {/* <hr />
            <div className={styles.sizes}>
              <h4 className={styles.sizesText}>Sizes</h4>
              {sizes.map((size) => {
                return (
                  <button
                    key={size}
                    className={styles.sizeButton}
                    style={{
                      borderColor: selectedSize === size && "black",
                      fontWeight: selectedSize === size && "bold",
                    }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <hr /> */}
            <div className={styles.buttons}>
              <Button style={{ margin: 0 }} onClick={checkoutHandler}>
                checkout
              </Button>
              <button className={styles.favButton} onClick={addEvent}>
                {isFavorite ? (
                  <HeartFilled width={24} height={24} />
                ) : (
                  <HeartIcon width={24} height={24} />
                )}
              </button>
            </div>
            <hr />
            <div className={styles.infoContainer}>
              <h4 className={styles.sizesText}>Product Information</h4>
              <p className={styles.infoText}>{links[0].description}</p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

// Product.getInitialProps = async function ({ query }) {
//   let data = {};
//   let error = {};
//   await db
//     .collection("Products")
//     .doc(query.product)
//     .get()
//     .then(function (doc) {
//       data = { id: doc.id, ...doc.data() };
//     })
//     .catch((e) => (error = e));

//   return {
//     data,
//     error,
//     query,
//   };
// };

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

  const paths = data?.getPaymentLinkPageDev?.items?.map((item) => (
    {
      params: {product: item.id.toString()}
    })
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {

  const id= ctx.params.product
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
  
  const item = data?.getPaymentLinkPageDev?.items;
  const selectedId = item?.filter(prodId=>prodId.id===id)
  // const indexProduct = prod?.filter((products) => products.status == "active");
  // console.log(selectedId);
  return {
    props: {
      links: selectedId
      // link: data?.getPaymentLinkPageDev?.items,
    },
  };
}