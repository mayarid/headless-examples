import Card from "../ui/Card";
import classes from "./ProductItem.module.css";
import { useRouter } from "next/router";
// import React, { useState, useRef } from "react";

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

  // const [show, setShow] = useState(false);

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
        <h3>{props.name}</h3>
        <h4>Rp. {props.amount}</h4>
        {props.status && <p className=".active">{props.status}</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={checkoutHandler}>Langsung Checkout</button>
      </div>
    </>
  );
}

export default ProductItem;
