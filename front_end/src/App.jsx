import "./App.css";
import { Header } from "./components/header/Header";
import { Home } from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Checkout } from "./components/checkout/Checkout";
import { Login } from "./components/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useEffect, useState } from "react";
import { useStateValue } from "./utils/StateProvider";
import { Payment } from "./components/payment/Payment";
import { Orders } from "./components/orders/Orders";
import { reducerAction } from "./utils/reducer";

import { Product } from "./components/product/Product";
import Admin from "./components/admin/Admin";
import NewProduct from "./components/admin/newProduct/NewProduct";

function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // run when App compenent loads
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // const uid = user.uid;
        // console.log('user: '+uid);
        dispatch({
          type: reducerAction.SET_USER,
          user: user,
        });
      } else {
        // User is signed out
        dispatch({
          type: reducerAction.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  // admin
  // new product
  const newProduct = async (product) => {
    const res = await fetch("http://localhost:9000/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const productdata = await res.json();
    setProducts([...products, productdata]);
  };

  // fetch product
  const getProduct = async () => {
    try {
      const fetchProduct = await fetch("http://localhost:9000/products");
      const jsonProduct = await fetchProduct.json();
      setProduct(jsonProduct);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  // fetch categories
  const getCategories = async () => {
    try {
      const fetchCategories = await fetch("http://localhost:9000/categories");
      const jsonCategories = await fetchCategories.json();
      setCategories(jsonCategories);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path={"/"} exact element={<Home product={product} />}></Route>
          <Route path={"/checkout"} element={<Checkout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          {/* admin */}
          <Route path="/admin" element={<Admin product={product} />}></Route>
          <Route
            path={"/newProduct"}
            element={
              <NewProduct
                newProduct={newProduct}
                categories={categories}
                // productImg={productImg}
              />
            }
          ></Route>

          {/* unknown route */}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
                <Link to={"/"}>
                  <button
                    style={{ backgroundColor: "green", textDecoration: "none" }}
                  >
                    Home
                  </button>
                </Link>
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
