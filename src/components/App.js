import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../shared/userContext';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

function App() {

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    return (
        <UserContext.Provider value={{
            token, setToken, username, setUsername
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/sign-up' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
