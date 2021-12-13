import ProductList from "../components/products/ProductList";
import { ApolloClient,InMemoryCache } from "@apollo/client";
import { GET_PAYMENT_LINK_PAGE_DEV } from "../graphql/queries";

function index({ link }) {
  console.log(link);

  return <ProductList data={link} />;
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

  return {
    props: {
      link: data?.getPaymentLinkPageDev?.items,
    },
  };
}

export default index;
