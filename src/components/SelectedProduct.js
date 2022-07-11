import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../shared/userContext";
import CartContext from "../shared/cartContext";
import Header from "./Header";

import Loading from "../styles/Loading";

const API_URL = process.env.REACT_APP_API_URL;

export default function SelectedProduct() {

    const navigate = useNavigate();
    const { library } = useContext(UserContext);
    const { shoppingCart, setShoppingCart } = useContext(CartContext);
    const { category, subcategory, productName } = useParams();

    const [product, setProduct] = useState({});
    const [subcategories, setSubcategories] = useState('');
    const [cartPopup, setCartPopup] = useState('');
    const [loading, setLoading] = useState('loading');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/products/${category}/${subcategory}/${productName}`)
            .then(res => {
                setProduct(res.data);
                setLoading('');
                let subcatString = '';
                for (let i = 0; i < res.data.subcategory.length; i++) {
                    if (i < res.data.subcategory.length - 1) {
                        subcatString += `${res.data.subcategory[i]}, `;
                    } else {
                        subcatString += res.data.subcategory[i];
                    }
                }
                setSubcategories(subcatString);
            })
            .catch(() => {
                setLoading('')
                setError(`
                    There was an error.
                    Try again.
                `);
            });
    }, [])

    function checkIfItsOnLibrary() {
        for (let i = 0; i < library.length; i++) {
            if (library[i] === product._id) {
                return true;
            }
        }
        return false;
    }

    function checkIfItsOnCart() {
        for (let i = 0; i < shoppingCart.length; i++) {
            if (shoppingCart[i].prodId === product._id) {
                return true;
            }
        }
        return false;
    }

    function handleClickRatings() {
        window.open(product.ratingsUrl);
    }

    function handleAddToCart() {
        setShoppingCart([
            ...shoppingCart,
            {
                prodId: product._id,
                name: product.name,
                coverUrl: product.image,
                category: product.category,
                subcategory: product.subcategory[0],
                price: product.price
            }
        ]);
        setCartPopup('popup');
    }

    function handleDownload() {
        setError('Enjoy!');
    }

    function EndButton() {
        if (checkIfItsOnLibrary()) {
            return (
                <ButtonStyle onClick={handleDownload}>
                    {`Already owned!`}<br/>
                    {`DOWNLOAD`}
                </ButtonStyle>
            );
        } else if (checkIfItsOnCart()) {
            return (
                <ButtonStyle disabled>
                    {`Already in`}<br/>
                    {`your cart`}
                </ButtonStyle>
            );
        } else {
            return (
                <ButtonStyle onClick={handleAddToCart}>
                    {`Add to cart`}<br/>
                    {`$${Number(product.price).toFixed(2)}`}
                </ButtonStyle>
            );
        }
    }

    return (
        <>
            <Header />
            {loading ? (
                <Loading>
                    <BallTriangle 
                        width="200"
                        height="200"
                        strokeColor="#126BA5"
                        animationDuration="1"
                        color="#ff4791"
                    />
                </Loading>
            ) : (
                Object.keys(product).length > 0 ? (
                    <OuterContainer>
                        <Container>
                            <Trailer
                                src={product.trailer}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></Trailer>
                            <CoverAndInfo>
                                <CoverContainer>
                                    <img
                                        src={product.image}
                                        alt="Cover"
                                    />
                                    <p>
                                        {`Release date: ${product.releaseDate}`}<br/>
                                        {`Producer: ${product.producer}`}<br/>
                                        {product.category}<br/>
                                        {subcategories}
                                    </p>
                                </CoverContainer>
                                <InfoContainer>
                                    <Title>{product.name}</Title>
                                    <ReleaseAndProducerMobile>
                                        {`Release date: ${product.releaseDate}`}<br/>
                                        {`Producer: ${product.producer}`}<br/>
                                        {product.category}<br/>
                                        {subcategories}
                                    </ReleaseAndProducerMobile>
                                    <RatingsButton onClick={handleClickRatings}>
                                        {`Rating: ${product.rating}`}
                                    </RatingsButton>
                                    <Description>
                                        {product.description}
                                    </Description>
                                </InfoContainer>
                            </CoverAndInfo>
                            <ButtonsContainer>
                                <EndButton />
                            </ButtonsContainer>
                        </Container>
                    </OuterContainer>
                ) : (
                    <></>
                )
            )}
            {cartPopup ? (
                <PopupBackground>
                    <PopupContainer>
                        <p>
                            Product added<br/>
                            to your cart!
                        </p>
                        <button onClick={navigate('/')}>
                            Ok
                        </button>
                    </PopupContainer>
                </PopupBackground>
            ) : (
                <></>
            )}
            {error ? (
                <PopupBackground>
                    <PopupContainer>
                        <p>{error}</p>
                        <button onClick={navigate('/')}>
                            Ok
                        </button>
                    </PopupContainer>
                </PopupBackground>
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
    overflow-y: scroll;
`;

const Container = styled.div`
    width: 1200px;
    height: 100%;

    padding: 32px;
    display: flex;
    flex-direction: column;

    @media (max-width: 1200px) {
        width: 100%;
        padding: 32px 0px;
    }
`;

const Trailer = styled.iframe`
    width: 100%;
    aspect-ratio: 1.77777778;
    margin-bottom: 32px;
`;

const CoverAndInfo = styled.div`
    width: 100%;
    display: flex;

    @media (max-width: 1200px) {
        flex-direction: column;
    }
`;

const CoverContainer = styled.div`
    width: 320px;
    margin-right: 32px;
    display: flex;
    flex-direction: column;

    > img {
        aspect-ratio: 0.64;
        object-fit: cover;
    }

    > p {
        margin-top: 16px;
        font-family: var(--scriptfont);
        font-size: 24px;
        line-height: 42px;
        color: var(--darkcolor);
    }

    @media (max-width: 1200px) {
        display: none;
    }
`;

const ReleaseAndProducerMobile = styled.p`
    display: none;
    padding: 0px 32px;
    font-family: var(--scriptfont);
    font-size: 24px;
    line-height: 36px;
    color: var(--darkcolor);

    @media (max-width: 1200px) {
        display: block;
    }
`;

const InfoContainer = styled.div`
    flex-grow: 1;

    @media (max-width: 1200px) {
        padding: 0px 32px;
    }
`;

const Title = styled.div`
    font-family: var(--headerfont);
    font-size: 64px;
    color: var(--darkcolor);
`;

const RatingsButton = styled.button`
    width: 256px;
    height: 64px;
    margin: 32px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 16px;
    background-color: var(--maincolor);
    border: none;
    cursor: pointer;

    font-family: var(--headerfont);
    font-weight: 500;
    font-size: 36px;
    color: var(--brightcolor);
    text-align: center;
`;

const Description = styled.p`
    margin-top: 32px;
    font-family: var(--scriptfont);
    font-size: 24px;
    color: var(--darkcolor);
`;

const ButtonsContainer = styled.div`
    width: 100%;
    min-height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonStyle = styled.button`
    width: 400px;
    height: 96px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 32px;
    background-color: var(--maincolor);
    border: none;
    cursor: pointer;

    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 32px;
    color: var(--brightcolor);
    text-align: center;

    :disabled {
        opacity: 0.4;
        cursor: default;
    }

    @media (max-width: 1200px) {
        width: 80%;
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
