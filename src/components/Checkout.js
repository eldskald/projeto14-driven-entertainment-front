import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../shared/userContext';
import CartContext from '../shared/cartContext';

import Header from './Header';

const API_URL = process.env.REACT_APP_API_URL;

function Checkout() {

    const navigate = useNavigate();
    const { token, library, setLibrary } = useContext(UserContext);
    const { shoppingCart, setShoppingCart } = useContext(CartContext);

    const [popup, setPopup] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    })
    
    function Product({ id, title, price }) {
        return (
            <ProductContainer>
                <h1 onClick={() => navigate(`/products/${id}`)}>{title}</h1>
                <p>{`$${price.toFixed(2)}`}</p>
            </ProductContainer>
        );
    }

    function getTotalPrice() {
        let sum = 0;
        shoppingCart.forEach(product => {
            sum += Number(product.price);
        });
        return `$${sum.toFixed(2)}`;
    }

    function handlePurchase(e) {
        e.stopPropagation();
        setPopup('popup');
        setMessage('');
        axios.put(`${API_URL}/checkout`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setLibrary([...library, ...shoppingCart]);
                setShoppingCart([]);
                setMessage(`
                    Thank you for your patronage!
                    You can download your new purchases
                    on your library.
                `);
            })
            .catch(err => {
                setMessage(err.response.data);
            });
    }

    return (
        <>
            <Header />
            <OuterContainer>
                <Container>
                    <CartContainer>
                        {shoppingCart.map((product, index) => (
                            <Product
                                key={index}
                                id={product.prodId}
                                title={product.name}
                                price={product.price}
                            />
                        ))}
                    </CartContainer>
                    <RightContainer>
                        <h1>{`Total: ${getTotalPrice()}`}</h1>
                        <ButtonStyle onClick={handlePurchase}>
                            Pay with Credit Card
                        </ButtonStyle>
                        <ButtonStyle onClick={handlePurchase}>
                            Pay with Wire Transfer
                        </ButtonStyle>
                    </RightContainer>
                </Container>
            </OuterContainer>
            {popup ? (
                message ? (
                    <PopupBackground>
                        <PopupContainer>
                            <p>{message}</p>
                            <button onClick={() => navigate('/')}>
                                Ok
                            </button>
                        </PopupContainer>
                    </PopupBackground>
                ) : (
                    <PopupBackground>
                        <PopupContainer>
                            <ThreeDots color='var(--maincolor)' />
                        </PopupContainer>
                    </PopupBackground>
                )
            ) : (
                <></>
            )}
        </>
    );
}

const OuterContainer = styled.div`
    position: absolute;
    top: 112px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 1200px;
    height: 100%;
    padding: 32px 32px 0px 32px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1200px) {
        width: 100%;
        padding: 32px 0px 0px 0px;
        flex-direction: column;
        justify-content: start;
    }
`;

const CartContainer = styled.div`
    width: 45%;
    min-height: 400px;
    height: fit-content;
    max-height: 700px;

    padding: 32px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    background-color: var(--brightcolor);
    border: 1px solid var(--graycolor);
    border-radius: 32px;
    box-shadow: 0px 0px 16px #c0c0c0;

    @media (max-width: 1200px) {
        width: 100%;
        min-height: auto;
        max-height: auto;
        flex-grow: 1;

        border-radius: 0px;
        border-left: 0px none transparent;
        border-right: 0px none transparent;
    }
`;

const ProductContainer = styled.div`
    width: 100%;
    margin: 16px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > h1 {
        font-family: var(--headerfont);
        font-size: 32px;
        color: var(--darkcolor);
    }

    > p {
        font-family: var(--scriptfont);
        font-size: 24px;
        color: var(--darkcolor);
    }
`;

const RightContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;

    > h1 {
        font-family: var(--headerfont);
        font-size: 52px;
        color: var(--darkcolor);
    }

    @media (max-width: 1200px) {
        width: 100%;
        padding: 32px;
    }
`;

const ButtonStyle = styled.button`
    width: 380px;
    height: 96px;
    margin: 32px 32px 0px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background-color: var(--maincolor);
    cursor: pointer;

    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 32px;
    color: var(--brightcolor);
    text-align: center;

    @media (max-width: 1200px) {
        width: 280px;
        margin: 32px auto 0px auto;
    }
`;


const PopupBackground = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.5);
`;

const PopupContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;

    background-color: var(--brightcolor);
    border: 1px solid var(--graycolor);
    border-radius: 16px;
    box-shadow: 0px 0px 4px 4px #606060;

    > p {
        font-family: var(--scriptfont);
        font-size: 24px;
        text-align: center;
        color: var(--darkcolor);
        cursor: pointer;
    }

    > button {
        width: 96px;
        height: 42px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 8px;
        background-color: var(--maincolor);
        border: none;
        cursor: pointer;

        font-family: var(--scriptfont);
        font-weight: 500;
        font-size: 28px;
        color: var(--brightcolor);
        text-align: center;
    }
`;

export default Checkout;
