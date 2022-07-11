import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import Header from './Header';

import Title from '../styles/Title';
import Thumbnail from '../styles/Thumbnail';

// Estrutura de cada objeto na array library:
// {
//     prodId: <_id do produto>
//     name: <nome do produto>
//     coverUrl: <URL da imagem de capa do produto>
//     category: <nome da categoria>
//     subcategory: <nome de uma subcategoria>
//     price: <preço do produto>
// }
// Igual do cart

function Library() {

    const navigate = useNavigate();
    const { library } = useContext(UserContext);

    function handleClick(prod) {
        navigate(`/products/${prod.category}/${prod.subcategory}/${prod.name}`);
    }

    return (
        <>
            <Header />
            <OuterContainer>
                <Container>
                    <TitleContainer>
                        <Title>Your Library</Title>
                    </TitleContainer>
                    <LibraryContainer>
                        {library.map((product, index) => (
                            <ProductContainer key={index} onClick={() => handleClick(product)} >
                                <Thumbnail artUrl={product.coverUrl} />
                                <p>{product.name}</p>
                            </ProductContainer>
                        ))}
                    </LibraryContainer>
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

const TitleContainer = styled.div`
    @media (max-width: 1200px) {
        padding: 0px 32px;
    }
`;

const LibraryContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    flex-grow: 1;

    padding: 32px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
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
    height: 360px;
    width: 250px;
    
    padding: 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        margin-top: 16px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        font-family: var(--headerfont);
        font-size: 28px;
        text-align: center;
        color: var(--darkcolor);
    }
`;

export default Library;
