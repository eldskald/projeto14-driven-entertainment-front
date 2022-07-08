import { useEffect,useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BallTriangle } from 'react-loader-spinner';
import UserContext from '../shared/userContext';
import Header from './Header.js';
import Loading from '../styles/Loading.js';

function Home() {
    const { username, token } = useContext(UserContext);
    const [relatedProducts,setRelatedProducts]=useState(null);
    const [moreSalesProducts, setMoreSalesProducts]=useState(null)
    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        setLoading(true);
        let config;
        if(!token){
            config={};
        }else{
            config={
                headers:{
                    Authorization:`Bearer ${token}`
                }
            };
        }
        
        const promiseRecomendedProducts=axios.get(`${process.env.REACT_APP_API_URL}/products`,config);
        promiseRecomendedProducts.then(res=>{
            setLoading(false);
            setRelatedProducts(res.data);
        } );
        promiseRecomendedProducts.catch(err=>{
            setLoading(false);
            console.log(err.response.data)});

        const promiseMoreSalesProducts=axios.get(`${process.env.REACT_APP_API_URL}/products`);
        promiseMoreSalesProducts.then(res=>{
            setLoading(false);
            setMoreSalesProducts(res.data);
        });
        promiseMoreSalesProducts.catch(err=>{
            setLoading(false);
            console.log(err.response.data);
        });

    },[token])
    
    function HomeScreenContent(){
        if(!relatedProducts || !moreSalesProducts){
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
            )
        }else{
            return (
               
                    <>
                        {loading ? 
                        <Loading>
                            <BallTriangle 
                                width="200"
                                height="200"
                                strokeColor="#FFFFFF"
                                animationDuration="1"
                                color="#ff4791"
                            />
                        </Loading>
                        :
                        <>
                            <Header />
                            <Container>
                                <ContentProduct>
                                    Para você
                                    <ProductsDiv>
                                        {relatedProducts.map(prod=>{
                                            return (
                                                <IndividualContent onClick={()=>console.log(prod)} key={prod._id}>
                                                    <img src={prod.image} alt='Product of a content that can be bought, if you want so'/>
                                                    <p>{prod.name}</p>
                                                    <p>R$ {prod.price.toFixed(2)}</p>
                                                </IndividualContent>
                                            );
                                        })}
                                    </ProductsDiv>
                            
                                </ContentProduct>

                                <ContentProduct>
                                    Os mais acessados
                                    <ProductsDiv>
                                        {moreSalesProducts.map(prod=>{
                                            return (
                                                <IndividualContent onClick={()=>console.log(prod)} key={prod._id}>
                                                    <img src={prod.image} alt='Product of a content that can be bought, if you want so'/>
                                                    <p>{prod.name}</p>
                                                    <p>R$ {prod.price.toFixed(2)}</p>
                                                </IndividualContent>
                                            );
                                        })}
                                    </ProductsDiv>
                            
                                </ContentProduct>

                            </Container>
                        </>
                        }
                    </>
                
            )
        }
    }

    const renderPageHomeScreen=HomeScreenContent();

    
    return (
        <>
         
            {renderPageHomeScreen}
            
        </>

        
    );
}

const AuthLegend = styled.div `
display:flex;
align-items:center;
justify-content:center;
height:100%;
> p a{
    text-decoration:none;
    color:var(--darkcolor);
}
`;

const Container = styled.div`
    width: 100%;
    min-height:100vh;
    margin: 160px auto 0px auto;

    padding: 0px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color:#EFEFEF;

    @media(max-width: 660px) {
        margin: 100px auto 0px auto;
    }
`;

const ContentProduct=styled.div`
    width:100%;
    margin:30px 0;
    background-color:#ffffff;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.15); 
    display:flex;
    flex-direction:column;
    font-size:25px;
    border:2px solid rgba(0,0,0,0.15);
    @media(max-width: 660px) {
        font-size: 15px;
    }
`;

const ProductsDiv=styled.div`
    width:100%;
    display:flex;
`;

const IndividualContent=styled.div`
    width:18%;
    height:200px;
    margin:20px 3%; 
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    > img{
        height:100%;
        aspect-ratio:0.67;
        object-fit:cover;
    }
    > p{
        font-size:15px;
    }
    @media(max-width: 660px) {
        height:150px;
        >p{
            font-size:12px;
        }
    }
`;

export default Home;
