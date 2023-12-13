import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/product/")
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

  const addToCart = async (productId) => {
    console.log("cart id", productId);
    try {
      setLoading(true);
      const userToken = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID is missing");
        return;
      }

      const addToCartUrl = `http://localhost:5000/cart/`;

      const response = await fetch(addToCartUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ productId, userId, quantity: 1 }),
      });

      if (response.ok) {
        console.log("Product added to cart successfully");
        // Optionally, you can update the UI or show a notification indicating success.
      } else {
        console.error("Failed to add product to cart");
        // Optionally, you can handle the error and provide feedback to the user.
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError(error.message || "Error adding product to cart");
    } finally {
      setLoading(false);
    }
  };

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
            <FaShoppingCart style={{ color: "black" }} />
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
          {products.map((obj) => (
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
              <button onClick={() => addToCart(obj._id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
