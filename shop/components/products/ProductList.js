import Card from "../ui/Card";
import ProductItem from "./ProductsItem";

function ProductList(props) {

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
export default ProductList;
