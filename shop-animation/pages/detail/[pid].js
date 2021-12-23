import { motion } from "framer-motion";
import Link from 'next/link'

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

const DetailPage = ({ link }) => {
  console.log("PID PROD", link)
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
                src="https://demo-only.mayar.link/digital-product-placeholder.png"
              />
            </div>
            <div className="w-1/2 p-2">
              <div>
                <small>
                  <Link href="/">
                    <button className="bg-white-500 hover:bg-white-700 text-black rounded">&larr; Kembali</button>
                  </Link>
                </small>
              </div>
              <div className="mt-5"><small className="mb-1 text-xs tracking-widest text-gray-500 title-font">KATEGORI</small></div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 title-font">NAMA PRODUK</h2>
                <h4 className="mt-1">Rp 1.200.000</h4>
                <p className="mt-4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Beli Sekarang</button>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DetailPage;
