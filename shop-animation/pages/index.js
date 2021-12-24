import React from "react";
import { motion } from "framer-motion";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_PAYMENT_LINK_PAGE_DEV } from "../graphql/queries";
import Link from "next/link";

const content = (isFirstMount) => ({
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: isFirstMount ? 2.8 : 0 },
  },
});

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

const products = {
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

export default function IndexPage({ isFirstMount, link }) {
  
  return (
    <motion.section exit={{ opacity: 0 }}>
      {isFirstMount && <InitialTransition />}

      <motion.div
        initial="initial"
        animate="animate"
        variants={content(isFirstMount)}
        className="space-y-12"
      >
        <motion.h2 variants={title} className="text-6xl font-black text-center">
          <br />
          Welcome to Mayar Store!
        </motion.h2>

        <motion.section variants={products} className="text-gray-700 body-font">
          <div className="container px-5 pt-12 mx-auto">
            <div className="flex flex-wrap -m-4">
              {link.map((product, index) => (
                <Product key={index} {...product} />
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </motion.section>
  );
}

const Product = ({ id, coverImage, type, name, amount }) => {
  

  return (
    <div className="w-full p-4 lg:w-1/4 md:w-1/2 shadow-md">
      <a className="relative block h-48 overflow-hidden rounded">
        {coverImage !== null ? (
          <img
            alt="ecommerce"
            className="block object-cover object-center w-full h-full"
            src={coverImage.url}
          />
        ) : (
          <img
            alt="ecommerce"
            className="block object-cover object-center w-full h-full"
            src="https://demo-only.mayar.link/digital-product-placeholder.png"
          />
        )}
      </a>
      <div className="mt-4">
        <h3 className="mb-1 text-xs tracking-widest text-gray-500 title-font">
          {type}
        </h3>
        <h2 className="text-lg font-medium text-gray-900 title-font">
          {name}{" "}
        </h2>
        <p className="mt-1">Rp{amount.toFixed(2)}</p>
        <Link href={`detail/${id}`}>
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Details
          </a>
        </Link>
      </div>
    </div>
  );
};

const blackBox = {
  initial: {
    height: "100%",
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: "afterChildren",
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const InitialTransition = () => {
  // Scroll user to top to avoid showing the footer
  React.useState(() => {
    typeof windows !== "undefined" && window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="absolute z-50 flex items-center justify-center w-full bg-black"
      initial="initial"
      animate="animate"
      variants={blackBox}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      <motion.svg variants={textContainer} className="absolute z-50 flex">
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width={750}
          height={800}
          className="text-white"
        >
          <rect className="w-full h-full fill-current" />
          <motion.rect
            variants={text}
            className="w-full h-full text-gray-600 fill-current"
          />
        </pattern>
        <text
          className="text-4xl font-bold"
          textAnchor="middle"
          x="50%"
          y="50%"
          style={{ fill: "url(#pattern)" }}
        >
          Mayar Store
        </text>
      </motion.svg>
    </motion.div>
  );
};

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

  return {
    props: {
      link: data?.getPaymentLinkPageDev?.items,
    },
  };
}
