import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { ApolloProvider } from "@apollo/client";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
