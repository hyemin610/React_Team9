import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const BackgroundColor = styled.main`
  background-color: #796b87;
`;

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

export const SignupBorder = styled.form`
  border: 3px solid white;
  border-radius: 10px;
  padding: 40px 40px 40px 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
`;

export const Space = styled.div`
  width: 360px;
  margin-bottom: 12px;
`;

export const Signup = styled.h1`
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

export const Nickname = styled.input`
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

export const PassWordConfirm = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
`;

export const SignupButton = styled.button`
  width: 40%;
  border: none;
  margin-left: 100px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid white;
  border-radius: 6px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  background-color: white;
  color: black;
  font-size: large;
  cursor: pointer;
  transition: all 0.3s ease; /* 애니메이션 효과 추가 */

  /* 마우스를 올렸을 때 스타일 변경 */
  &:hover {
    background-color: #978bab; /* 변경할 배경색 */
    color: white; /* 변경할 글자 색 */
    transform: scale(1.05); /* 살짝 크게 만드는 애니메이션 효과 */
  }
`;

export const LoginLink = styled(Link)`
  font-size: larger;
  margin-left: 150px;
  color: white;
  cursor: pointer;
  text-decoration: none;

  /* 마우스를 올렸을 때 스타일 변경 */
  &:hover {
    color: black; /* 변경할 글자 색 */
  }
`;
