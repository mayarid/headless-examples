import classes from "./ProductItem.module.css";
import { useRouter } from "next/router";


function ProductItem(props) {
  const router = useRouter();
  const productImage = {
    ...props.image,
  };

  const imageNotFound =
    "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=829&q=80";

  const checkoutHandler = () => {
    router.push(props.url);
  };

  return (
    <>
      <div className={classes.image}>
        <img
          src={
            Object.values(productImage).length == 0
              ? imageNotFound
              : productImage["url"]
          }
          alt={props.name}
        />
      </div>
      <div className={classes.content}>
        <h3>Produk : &nbsp;&nbsp;{props.name}</h3>
        <h3>Harga : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rp. {props.amount}</h3>
        {props.status && <h3 className=".active">Status : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.status}</h3>}
      </div>
      <div className={classes.actions}>
        <button onClick={checkoutHandler}>Langsung Checkout</button>
      </div>
    </>
  );
}

export default ProductItem;
