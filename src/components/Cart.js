import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import CartContext from '../shared/cartContext';
import Header from './Header';

import Title from '../styles/Title';
import Thumbnail from '../styles/Thumbnail';

export default function Cart() {

    // O shopping cart tem que ser preenchidos com objetos
    // com a seguinte estrutura:
    //
    // {
    //     prodId: <_id do produto>
    //     name: <nome do produto>
    //     coverUrl: <URL da imagem de capa do produto>
    //     category: <nome da categoria>
    //     subcategory: <nome de uma subcategoria>
    //     price: <preço do produto>
    // }
    //
    // É bom a gente fazer assim ao invés de só botar os _id's
    // porque assim a gente evita fazer uma requisição extra pra
    // API e a página do carrinho carrega mais rápido.

    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const { shoppingCart, setShoppingCart } = useContext(CartContext);

    function Product({ id, coverArt, title, category, subcategory, price, index }) {
        console.log(price);
        return (
            <ProductContainer>
                <CoverAndTitleAndCategory>
                    <Thumbnail
                        artUrl={coverArt}
                        onClick={() => handleClick(category, subcategory, title)}
                    />
                    <TitleAndCategory onClick={() => navigate(`/${id}`)} >
                        <h1>{title}</h1>
                        <h2>{category}</h2>
                        <h3>{`$${Number(price).toFixed(2)}`}</h3>
                    </TitleAndCategory>
                </CoverAndTitleAndCategory>
                <Pricetag>{`$${Number(price).toFixed(2)}`}</Pricetag>
                <RemoveButton>
                    <ion-icon
                        name='trash-outline'
                        onClick={() => handleRemove(index)}
                    ></ion-icon>
                </RemoveButton>
            </ProductContainer>
        );
    }

    function handleClick(category, subcategory, name) {
        navigate(`/products/${category}/${subcategory}/${name}`);
    }

    function handleRemove(index) {
        const arr = [...shoppingCart];
        arr.splice(index, 1);
        setShoppingCart([...arr]);
    }

    function handleCheckout() {
        if (!token) {
            navigate('/login');
        } else {
            navigate('/checkout');
        }
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
                    <TitleContainer>
                        <Title>Your shopping cart</Title>
                    </TitleContainer>
                    <CartContainer>
                        {shoppingCart.map((product, index) => (
                            <Product
                                key={index}
                                id={product.prodId}
                                title={product.name}
                                category={product.category}
                                subcategory={product.subcategory}
                                coverArt={product.coverUrl}
                                price={`$${Number(product.price).toFixed(2)}`}
                                index={index}
                            />
                        ))}
                    </CartContainer>
                    <BottomContainer>
                        <ButtonsContainer>
                            <ButtonStyle
                                onClick={handleCheckout}
                                disabled={shoppingCart.length === 0}
                            >
                                Checkout
                            </ButtonStyle>
                            <ButtonStyle onClick={() => navigate('/')}>
                                Resume Shopping
                            </ButtonStyle>
                        </ButtonsContainer>
                        <TotalPrice>
                            Total:<br />{getTotalPrice()}
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
    position: relative;
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

const RemoveButton = styled.div`
    position: absolute;
    bottom: 20px;
    right: 52px;
    cursor: pointer;

    > ion-icon {
        font-size: 42px;
        color: var(--darkcolor);
    }

    @media (max-width: 1200px) {
        right: 0px;
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

    :disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const TotalPrice = styled.div`
    margin-right: 48px;
    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 32px;
    color: var(--darkcolor);
`;
