import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const BackgroundColor = styled.main`
  background-color: #796b87;
`;

export const Container = styled.main`
  margin: auto;
  width: 80%;
  max-width: 1000px;
  min-width: 500px;
  /* background-color: #796b87; */
`;

export const LoginBoxLocation = styled.div`
  display: flex;
  justify-content: center;
  height: 600px;
  align-items: center;
`;

export const Space = styled.div`
  width: 360px;
  margin-bottom: 20px;
`;

export const Login = styled.h1`
  font-size: 3em;
  color: white;
  text-align: center;
  margin-bottom: 50px;
`;

export const Email = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
`;

export const Password = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
`;

export const LoginButton = styled.button`
  width: 40%;
  border: none;
  margin-left: 100px;
  padding: 12px;
  border-radius: 6px;
  background-color: aliceblue;
  color: black;
  font-size: large;
  cursor: pointer;
`;

export const SignupLink = styled(Link)`
  font-size: larger;
  margin-left: 140px;
  color: white;
  cursor: pointer;
  text-decoration: none;
`;
