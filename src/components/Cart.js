import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import CartContext from '../shared/cartContext';
import Header from './Header';

import Title from '../styles/Title';
import Thumbnail from '../styles/Thumbnail';

export default function Cart (){

    const navigate = useNavigate();
    const { token, username } = useContext(UserContext);
    const { shoppingCart } = useContext(CartContext);

    function Product({ coverArt, title, category, price }) {
        return (
            <ProductContainer>
                <CoverAndTitleAndCategory>
                    <Thumbnail artUrl={coverArt} />
                    <TitleAndCategory>
                        <h1>{title}</h1>
                        <h2>{category}</h2>
                        <h3>{price}</h3>
                    </TitleAndCategory>
                </CoverAndTitleAndCategory>
                <Pricetag>{price}</Pricetag>
            </ProductContainer>
        );
    }

    return (
        <>
            <Header />
            <OuterContainer>
                <Container>
                    <TitleContainer>
                        <Title>Your shopping cart</Title>
                    </TitleContainer>
                    <CartContainer>
                    <Product
                        title={'Elden Ring'}
                        category={'Video Game'}
                        coverArt={'https://mundodrix.com.br/site/wp-content/uploads/2022/03/Elden-Ring.jpg'}
                        price={'$59.99'}
                    />
                    <Product
                        title={'Elden Ring'}
                        category={'Video Game'}
                        coverArt={'https://mundodrix.com.br/site/wp-content/uploads/2022/03/Elden-Ring.jpg'}
                        price={'$59.99'}
                    />
                    <Product
                        title={'Elden Ring'}
                        category={'Video Game'}
                        coverArt={'https://mundodrix.com.br/site/wp-content/uploads/2022/03/Elden-Ring.jpg'}
                        price={'$59.99'}
                    />
                    <Product
                        title={'Elden Ring'}
                        category={'Video Game'}
                        coverArt={'https://mundodrix.com.br/site/wp-content/uploads/2022/03/Elden-Ring.jpg'}
                        price={'$59.99'}
                    />
                    </CartContainer>
                    <BottomContainer>
                        <ButtonsContainer>
                            <ButtonStyle>
                                Checkout
                            </ButtonStyle>
                            <ButtonStyle onClick={() => navigate('/')}>
                                Keep Buying
                            </ButtonStyle>
                        </ButtonsContainer>
                        <TotalPrice>
                            Total:<br/>$200.00
                        </TotalPrice>
                    </BottomContainer>
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
    flex-direction: column;

    @media (max-width: 1200px) {
        width: 100%;
        padding: 32px 0px 0px 0px;
    }
`;

const TitleContainer = styled.div`
    @media (max-width: 1200px) {
        padding: 0px 32px;
    }
`;

const CartContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    flex-grow: 1;

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
`;

const CoverAndTitleAndCategory = styled.div`
    display: flex;
    align-items: center;
`;

const TitleAndCategory = styled.div`
    display: flex;
    margin-left: 32px;
    flex-direction: column;

    > h1 {
        font-family: var(--headerfont);
        font-size: 32px;
        color: var(--darkcolor);
    }

    > h2 {
        margin-top: 16px;
        font-family: var(--scriptfont);
        font-size: 24px;
        color: var(--darkcolor);
    }

    > h3 {
        margin-top: 8px;
        font-family: var(--scriptfont);
        font-size: 24px;
        color: var(--darkcolor);

        @media (min-width: 1200px) {
            display: none;
        }
    }
`;

const Pricetag = styled.div`
    margin-right: 48px;
    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 32px;
    color: var(--darkcolor);

    @media (max-width: 1200px) {
        display: none;
    }
`;

const BottomContainer = styled.div`
    width: 100%;
    height: 160px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonsContainer = styled.div`
    height: 120px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    
    @media (max-width: 1200px) {
        flex-direction: column;
    }
`;

const ButtonStyle = styled.button`
    width: 200px;
    height: 42px;
    margin: 0px 32px 0px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background-color: var(--maincolor);
    cursor: pointer;

    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 20px;
    color: var(--brightcolor);
    text-align: center;
`;

const TotalPrice = styled.div`
    margin-right: 48px;
    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 32px;
    color: var(--darkcolor);
`;
