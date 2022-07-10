import Header from "./Header";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const API_URL = process.env.REACT_APP_API_URL;

export default function SignupProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  const [rating, setRate] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcattegory] = useState([]);
  const [producer, setProducer] = useState("");
  const [releaseDate, setRealeasedate] = useState("");
  const [trailer, setTrailer] = useState("");
  const [ratingsUrl, setRatingsUrl] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      name,
      price: parseFloat(price),
      description,
      rating,
      ratingsUrl,
      image,
      trailer,
      category,
      subcategory: subcategory.split(","),
      producer,
      releaseDate,
    };
    axios
      .post(`${API_URL}/signup-products`, body)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <Header />
      <Container>
        <Title>SignUp a Product</Title>
        <Form>
          <TextInput
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextInput
            style={{ height: 100 }}
            type="text"
            placeholder="desription"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="subcategory"
            value={subcategory}
            onChange={(e) => setSubcattegory(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="producer"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="release date"
            value={releaseDate}
            onChange={(e) => setRealeasedate(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="rate"
            value={rating}
            onChange={(e) => setRate(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="rating URL"
            value={ratingsUrl}
            onChange={(e) => setRatingsUrl(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="trailer"
            value={trailer}
            onChange={(e) => setTrailer(e.target.value)}
          />
        </Form>
        <SubmitButtonStyle onClick={handleSubmit}>Cadastrar</SubmitButtonStyle>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 0px 32px;
  width: 1000px;
  margin: 156px auto 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1000px) {
    width: 100%;
    margin: 200px auto 0px auto;
  }
`;
const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: var(--scriptfont);
  font-size: 52px;
  font-weight: 500;
  color: var(--darkcolor);
`;
const TextInput = styled.input`
  width: 100%;
  height: 42px;
  margin: 8px 0px;
  padding-left: 16px;
  border: 1px solid var(--darkcolor);
  border-radius: 8px;
  outline: none;
  background-color: var(--brightcolor);
  font-size: 20px;
  color: var(--darkcolor);
  :placeholder {
    color: var(--graycolor);
  }
`;

const SubmitButtonStyle = styled.button`
  width: 100%;
  height: 42px;
  margin: 8px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid transparent;
  border-radius: 8px;
  background-color: var(--maincolor);

  font-family: var(--scriptfont);
  font-weight: 500;
  font-size: 20px;
  color: var(--brightcolor);
  text-align: center;
`;
