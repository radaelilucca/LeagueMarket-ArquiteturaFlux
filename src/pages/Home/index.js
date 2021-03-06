import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MdAddShoppingCart } from "react-icons/md";

import { ProductList } from "./styles";
import coins from "../../assets/images/coins.svg";

import * as CartActions from "../../store/modules/cart/actions";
import api from "../../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const amount = useSelector((state) =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;

      return amount;
    }, {})
  );

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <p className="desc"> {product.description} </p>

          <span>
            <img
              className="coins"
              src={coins}
              alt={`Price: ${product.price}`}
            />{" "}
            {product.price}
          </span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={22} color="#FFF" />{" "}
              <p>{amount[product.id] || 0}</p>
            </div>

            <span>ADD TO CART</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
