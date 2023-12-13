import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const userToken = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [productQty, setProducrQty] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/cart/find/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
        setError("Error fetching cart items");
      });
  }, [userId, userToken]);

  useEffect(() => {
    const fetchProducts = async () => {
      const uniqueProductIds = new Set();

      for (const obj of cartItems) {
        var producCartId;
        obj.products.map((obj) => {
          producCartId = obj?.productId;
        });
        if (
          !products.some((item) => item?._id === producCartId) &&
          !uniqueProductIds.has(producCartId)
        ) {
          uniqueProductIds.add(producCartId);
          try {
            const response = await fetch(
              `http://localhost:5000/product/find/${producCartId}`
            );
            const data = await response.json();
            setProducts((prevProducts) => [...prevProducts, data]);
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
        }
      }
      setLoading(false);
    };

    fetchProducts();
  }, [cartItems]);

  const totalCost = products.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleIncreaseQuantity = (productId) => {
    
  };

  const handleDecreaseQuantity = (productId) => {
    //  logic to decrease quantity
  };
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${userToken}`,
        },
      });
  
      if (response.ok) {
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <h3>Total Cost: {totalCost.toFixed(2)}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <div className="cart-items">
              {products?.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img src={item?.img} alt={item?.title} />
                  <h3>{item?.title}</h3>
                  <h4>{item?.desc}</h4>
                  <h5>Price: {item?.price}</h5>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecreaseQuantity(item._id)}>
                      <FaMinus />
                    </button>
                    <h3 className="quantity">{item?.quantity}</h3>
                    <button onClick={() => handleIncreaseQuantity(item._id)}>
                      <FaPlus />
                    </button>
                    <button className="delete-btn" onClick={() => handleRemoveProduct(item._id)}>
                    <FaTrash />
                    Delete
                  </button>
                  </div>
                 
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <Link to={{ pathname: "/checkout", state: { totalCost } }}>
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
