import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import CartContext from '../shared/cartContext';

import Header from './Header';

function Checkout() {

    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const { shoppingCart } = useContext(CartContext);

    const [popup, setPopup] = useState('');

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
                        <ButtonStyle>Pay with Credit Card</ButtonStyle>
                        <ButtonStyle>Pay with Wire Transfer</ButtonStyle>
                    </RightContainer>
                </Container>
            </OuterContainer>
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

export default Checkout;