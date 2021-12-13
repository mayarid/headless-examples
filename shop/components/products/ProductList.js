// import { useAppContext } from "../../context/meetup";
import Card from "../ui/Card";
import ProductItem from "./ProductsItem";
// import classes from "./ProductList.module.css";

function ProductList(props) {
  // const ctx = useAppContext();
  // // console.log(ctx);
  return (
    <>
      {props.data.map((products) => (
        <Card key={products.id}>
          <ProductItem
            id={products.id}
            status = {products.status}
            image={products.coverImage}
            name={products.name}
            amount={products.amount}
            url = {products.invoiceUrl}
          />
        </Card>
      ))}
    </>
  );
}
// export async function getStaticProps() {
//   //fetching data
//   return {
//     props: {
//       meetup: ctx,
//     },
//  revalidate : 1
//   };
// }
export default ProductList;
