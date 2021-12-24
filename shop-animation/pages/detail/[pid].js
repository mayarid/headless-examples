import { motion } from "framer-motion";
import Link from "next/link";
import {useRouter} from 'next/router';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_PAYMENT_LINK_PAGE_DEV } from "../../graphql/queries";

const content = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const title = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const inputs = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const DetailPage = ({link}) => {
  
  const router = useRouter()
  const imageNull = 'https://demo-only.mayar.link/digital-product-placeholder.png'

  const item = link[0]

  //checkoutHandler
  const checkOutHandler = () => {
    router.push(item.invoiceUrl)
  }
  
  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="relative text-gray-700 body-font"
    >
      <motion.div
        variants={content}
        animate="animate"
        initial="initial"
        className="container px-5 py-24 mx-auto"
      >
        <motion.div
          variants={title}
          className="flex flex-col w-full mb-12 text-left"
        >
          <div className="flex flex-wrap -m-2">
            <div className="w-1/2 p-2">
              <img
                alt="ecommerce"
                className="block object-cover object-center w-full h-full"
                src={item.coverImage !== null?item.coverImage['url']:imageNull}
              />
            </div>
            <div className="w-1/2 p-2">
              <div>
                <small>
                  <Link href="/">
                    <button className="bg-white-500 hover:bg-white-700 text-black rounded">
                      &larr; Kembali
                    </button>
                  </Link>
                </small>
              </div>
              <div className="mt-5">
                <small className="mb-1 text-xs tracking-widest text-gray-500 title-font">
                  {item.type}
                </small>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 title-font">
                  {item.name}
                </h2>
                <h4 className="mt-1">Rp {item.amount}</h4>
                <p className="mt-4">
                 {item.description}
                </p>
                <button onClick={checkOutHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DetailPage;

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
      params: { pid: items.id.toString()}
    })
  );

  return {
    paths,
    fallback: false,
  };
}



export async function getStaticProps(ctx) {

  const id = ctx.params.pid
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

  const prod = data?.getPaymentLinkPageDev?.items
  const selectedItems = prod?.filter(prod=>prod.id===id)

  return {
    props: {
      link:selectedItems
    },
  };
}
