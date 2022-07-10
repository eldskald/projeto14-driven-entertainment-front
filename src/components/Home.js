import { useEffect, useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../shared/userContext";
import Header from "./Header.js";
import Loading from "../styles/Loading.js";
import Title from "../styles/Title";
import Thumbnail from "../styles/Thumbnail";

function Home() {
  // O shopping cart tem que ser preenchidos com objetos
  // com a seguinte estrutura:
  //
  // {
  //     prodId: <_id do produto>
  //     name: <nome do produto>
  //     coverUrl: <URL da imagem de capa do produto>
  //     category: <nome da categoria>
  //     price: <preço do produto>
  // }
  //
  // É bom a gente fazer assim ao invés de só botar os _id's
  // porque assim a gente evita fazer uma requisição extra pra
  // API e a página do carrinho carrega mais rápido.

  const { token } = useContext(UserContext);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [moreSalesProducts, setMoreSalesProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let config;
    if (!token) {
      config = {};
    } else {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    const promiseRecomendedProducts = axios.get(
      `${process.env.REACT_APP_API_URL}/productsNewReleases`,
      config
    );
    promiseRecomendedProducts.then((res) => {
      setLoading(false);
      setRelatedProducts(res.data);
    });
    promiseRecomendedProducts.catch((err) => {
      setLoading(false);
      console.log(err.response.data);
    });

    const promiseMoreSalesProducts = axios.get(
      `${process.env.REACT_APP_API_URL}/productsNewReleases`
    );
    promiseMoreSalesProducts.then((res) => {
      setLoading(false);
      setMoreSalesProducts(res.data);
    });
    promiseMoreSalesProducts.catch((err) => {
      setLoading(false);
      console.log(err.response.data);
    });
  }, [token]);

  function HomeScreenContent() {
    if (!relatedProducts || !moreSalesProducts) {
      return (
        <Loading>
          <BallTriangle
            width="200"
            height="200"
            strokeColor="#126BA5"
            animationDuration="1"
            color="#ff4791"
          />
        </Loading>
      );
    } else {
      return (
        <>
          {loading ? (
            <Loading>
              <BallTriangle
                width="200"
                height="200"
                strokeColor="#FFFFFF"
                animationDuration="1"
                color="#ff4791"
              />
            </Loading>
          ) : (
            <>
              <Header />
              <OuterContainer>
                <InnerContainer>
                  <TitleContainer>
                    <Title>For you</Title>
                  </TitleContainer>
                  <ContentProduct>
                    <ProductsDiv>
                      {relatedProducts.map((prod) => {
                        return (
                          <IndividualContent
                            onClick={() => console.log(prod)}
                            key={prod._id}
                          >
                            <Thumbnail artUrl={prod.image} />
                            <p>{prod.name}</p>
                            <p>$ {prod.price.toFixed(2)}</p>
                          </IndividualContent>
                        );
                      })}
                    </ProductsDiv>
                  </ContentProduct>
                  <TitleContainer>
                    <Title>Top sellers</Title>
                  </TitleContainer>
                  <ContentProduct>
                    <ProductsDiv>
                      {moreSalesProducts.map((prod) => {
                        return (
                          <IndividualContent
                            onClick={() => console.log(prod)}
                            key={prod._id}
                          >
                            <Thumbnail artUrl={prod.image} />
                            <p>{prod.name}</p>
                            <p>$ {prod.price.toFixed(2)}</p>
                          </IndividualContent>
                        );
                      })}
                    </ProductsDiv>
                  </ContentProduct>
                </InnerContainer>
              </OuterContainer>
            </>
          )}
        </>
      );
    }
  }

  const renderPageHomeScreen = HomeScreenContent();

  return <>{renderPageHomeScreen}</>;
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

const InnerContainer = styled.div`
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

const ContentProduct = styled.div`
  min-width: 100%;
  margin: 30px 0;
  border-radius: 32px;
  box-shadow: 0px 0px 16px #c0c0c0;
  border: 1px solid var(--graycolor);
  background-color: var(--brightcolor);
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  overflow-x: scroll;

  margin-top: 16px;
  @media (max-width: 1200px) {
    width: 100%;
    border-radius: 0px;
    border-left: 0px none transparent;
    border-right: 0px none transparent;
  }
`;

const ProductsDiv = styled.div`
  width: 100%;
  display: flex;
`;

const IndividualContent = styled.div`
  width: 18%;
  height: 200px;
  margin: 20px 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    font-family: var(--scriptfont);
    font-size: 24px;
    color: var(--darkcolor);
  }
  @media (max-width: 660px) {
    height: 150px;
    > p {
      font-size: 12px;
    }
    > div {
      width: 70px;
      height: 100px;
    }
  }
`;

export default Home;
