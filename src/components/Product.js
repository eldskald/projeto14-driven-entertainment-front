import styled from "styled-components";
import Header from "./Header";

export default function SelectedProduct() {
  return (
    <>
      <Header />
      <Container>
        <ProductBox>
          <ProductInfo>
            <img
              src="https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/3/5/8/5604931154853/tsp20100803202519/Pucca-Vol-2-Confusoes-Ninja.jpg"
              alt="img"
            />
            <span>
              Pucca, Pucca Funny Love ou Pucca: Love Recipe é uma série de
              animação estadunidense/canadense/sul-coreana produzida pela Jetix
              Animation Concepts, Cookie Jar Entertainment e MBC Films. Pucca é
              uma garota com poderes gelados que gosta de Garu, que não se sabe
              se gosta dela, já que sempre foge da garota.
            </span>
          </ProductInfo>
        </ProductBox>
        <ButtonsContainer>
          <ButtonStyle>Add to cart</ButtonStyle>
        </ButtonsContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 150px auto 0px auto;
  padding: 32px 32px 0px 32px;
  width: 1000px;
  height: auto;

  @media (max-width: 1000px) {
    width: 100%;
    margin: 200px auto 0px auto;
  }
`;

const ProductBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductInfo = styled.div`
  display: flex;
  img {
    width: 220px;
    height: 300px;
    margin-right: 20px;
  }
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
  width: 300px;
  height: 42px;
  margin: 0px 32px 0px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: var(--maincolor);
  border: none;
  cursor: pointer;

  font-family: var(--scriptfont);
  font-weight: 500;
  font-size: 20px;
  color: var(--brightcolor);
  text-align: center;
`;
