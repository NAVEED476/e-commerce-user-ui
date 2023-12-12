import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Cart = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzVmM2NjMWUwMTU2MGMxOGI2Y2JiYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjM1OTYxOSwiZXhwIjoxNzAyNDQ2MDE5fQ.87PIFsMeKUlvA3UJByQeqxjfRRjZd0ctiJfP-2amevQ"
  console.log("token",userToken)
  console.log("userid",userId)

  useEffect(() => {
    fetch(`http://localhost:5000/cart/find/657680fbaacb78f498c69568`,{
      headers:{
        "Content-Type":"application/json",
        token:`Bearer ${userToken}`,
      }

    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  console.log(products)

  return (
    <div className="inventory-container">
      <div className="header">
        <img
          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
          alt=""
        />
        <input type="text" />
        <Link to="/cart">
          <h4>
            {/* <FaShoppingCart style={{ color: "black" }} /> */}
            {/* {cart} */}
          </h4>
        </Link>
        <h4>Settings</h4>
      </div>
      {loading ? (
        <div className="loader">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="product-details">
              <div
                style={{
                  width: "300px",
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <h3>Loading...</h3>
              <label htmlFor="">Loading...</label>
              <h4>Loading...</h4>
              <button>Loading...</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-container">
          {products.products && products.products.map((obj) => (
            <div key={obj.id} className="product-details">
              <div
                style={{
                  width: "300px",
                  height: "200px",
                  backgroundImage: `url(${obj.img})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <h3>{obj.title}</h3>
              <label htmlFor="">{obj.desc}</label>
              <h4>{obj.price}</h4>
              {/* <button onClick={() => addToCart(obj.id)}>Add to Cart</button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

 

export default Cart;
