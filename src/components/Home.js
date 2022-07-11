import { useEffect, useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BallTriangle } from "react-loader-spinner";
import UserContext from "../shared/userContext";
import Header from "./Header.js";
import Loading from "../styles/Loading.js";
import Title from "../styles/Title";
import Thumbnail from "../styles/Thumbnail";
import { useNavigate } from "react-router-dom";


function Home() {

  const { token } = useContext(UserContext);
  const [newProducts, setnewProducts] = useState(null);
  const [topRatedProducts, setTopRatedProducts] = useState(null);
  const [categories, setCategories]=useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

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

    const promiseNewRealsesProducts = axios.get(
      `${process.env.REACT_APP_API_URL}/productsNewReleases`,
      config
    );
    promiseNewRealsesProducts.then((res) => {
      setLoading(false);
      setnewProducts(res.data);
    });
    promiseNewRealsesProducts.catch((err) => {
      setLoading(false);
      console.log(err.response.data);
    });

    const promisetopRateProducts = axios.get(
      `${process.env.REACT_APP_API_URL}/productsTopRated`
    );
    promisetopRateProducts.then((res) => {
      setLoading(false);
      setTopRatedProducts(res.data);
    });
    promisetopRateProducts.catch((err) => {
      setLoading(false);
      console.log(err.response.data);
    });

   axios.get(`${process.env.REACT_APP_API_URL}/categories`)
      .then(res=>{
        setLoading(false);
        setCategories(res.data);
      })
      .catch(err=>{
        setLoading(false);
        console.log(err.response.data)
      });
    
    setLoading(false);
  }, [token]);

  function HomeScreenContent() {
    if (!newProducts || !topRatedProducts || !categories) {
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
                <CategoryContainer>
                  {categories.map((cat,index)=>{
                    return (<button key={index}>{cat}</button>)
                  })}
                </CategoryContainer>
                <InnerContainer>
                  <TitleContainer>
                    <Title>New Releases</Title>
                  </TitleContainer>
                  <ContentProduct>
                    <ProductsDiv>
                      {newProducts.map((prod) => {
                        return (
                          <IndividualContent
                            onClick={() => {navigate(`/products/${prod.category}/${prod.subcategory[0]}/${prod.name}`)}}
                            key={prod._id}
                          >
                            <Thumbnail artUrl={prod.image} />
                            <h1>{prod.name}</h1>
                            <h2>${prod.price.toFixed(2)}</h2>
                          </IndividualContent>
                        );
                      })}
                    </ProductsDiv>
                  </ContentProduct>
                  <TitleContainer>
                    <Title>Top Rated</Title>
                  </TitleContainer>
                  <ContentProduct>
                    <ProductsDiv>
                      {topRatedProducts.map((prod) => {
                        return (
                          <IndividualContent
                          onClick={() =>{navigate(`/products/${prod.category}/${prod.subcategory[0]}/${prod.name}`)}}
                            key={prod._id}
                          >
                            <Thumbnail artUrl={prod.image} />
                            <h1>{prod.name}</h1>
                            <h2>${prod.price.toFixed(2)}</h2>
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
  align-items: center;
  flex-direction:column;
`;

const CategoryContainer =styled.div`
display:flex;
width:100%;
justify-content:center;
padding: 0 10%;
align-items:center;
margin-top:50px;
  > button{
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
  }
  > button:hover{
    cursor:pointer;
  }
  @media (max-width:660px) {
    >button{
      font-size:20px;
    }
  }
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
  height: 100%;
  
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    margin-top: 8px;
    font-family: var(--headerfont);
    font-size: 28px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-lines: 2;
    color: var(--darkcolor);
  }

  > h2 {
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
