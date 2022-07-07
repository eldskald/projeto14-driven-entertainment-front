import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../shared/userContext';
import { loadSession } from '../shared/loginPermanence';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Products from "./Products";
import Chart from './Chart';

function App() {

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        loadSession(setToken, setUsername);
    }, []);

    return (
        <UserContext.Provider value={{
            token, setToken, username, setUsername
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/chart' element={<Chart />} />
                      <Route path="/signup-products" element={<Products />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );

}

export default App;
