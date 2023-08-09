import { styled } from "styled-components";

export const Container = styled.main`
  margin: auto;
  width: 80%;
  max-width: 1200px;
  min-width: 800px;
`;

export const SignupBoxLocation = styled.div`
  display: flex;
  justify-content: center;
  height: 600px;
  align-items: center;
`;

export const Space = styled.div`
  width: 360px;
  margin-bottom: 12px;
`;

export const Email = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
`;

export const Nickname = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
`;

export const Password = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
`;

export const PassWordConfirm = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
`;

export const LoginButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: aliceblue;
  color: black;
  cursor: pointer;
`;

export const SignupButton = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: beige;
  color: black;
  cursor: pointer;
`;
