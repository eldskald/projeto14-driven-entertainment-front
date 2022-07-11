import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import UserContext from "../shared/userContext";
import CartContext from "../shared/cartContext";
import { loadSession, endSession } from "../shared/loginPermanence";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import SelectedProduct from "./SelectedProduct";
import SignupProducts from "./SignupProducts";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Library from "./Library";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [library, setLibrary] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);

    useEffect(() => {
        loadSession(setToken, setUsername);
    }, []);

    useEffect(() => {
        if (!token) {
            return;
        }
        axios.get('/library', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => setLibrary(res.data))
            .catch(() => endSession());
    }, [token])

    useEffect(() => {
        if (!token) {
            return;
        }
        axios.put(`${API_URL}/cart`, shoppingCart, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }, [shoppingCart]);

    return (
        <UserContext.Provider
            value={{
                token,
                setToken,
                username,
                setUsername,
                library,
                setLibrary
            }}
        >
            <CartContext.Provider
                value={{
                    shoppingCart,
                    setShoppingCart
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/products/:category/:subcategory/:productName" element={<SelectedProduct />} />
                        <Route path="/signup-products" element={<SignupProducts />} />
                    </Routes>
                </BrowserRouter>
            </CartContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
