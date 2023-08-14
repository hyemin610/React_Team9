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

// form 테두리
export const SignupBorder = styled.form`
  border: 3px solid white;
  border-radius: 10px;
  padding: 40px 40px 40px 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
`;

// input 사이 공간
export const Space = styled.div`
  width: 360px;
  margin-bottom: 12px;
`;

// 회원가입 이름
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
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;

export const Nickname = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;

export const Password = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;

export const PassWordConfirm = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 8px;
  box-sizing: border-box;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;

// ok 버튼
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
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  /* 마우스를 올렸을 때 스타일 변경 */
  &:hover {
    background-color: #978bab; /* 변경할 배경색 */
    color: white; /* 변경할 글자 색 */
    transform: scale(1.05); /* 살짝 크게 만드는 애니메이션 효과 */
  }
`;

// 로그인 페이지로 이동
export const LoginLink = styled(Link)`
  font-size: larger;
  margin-left: 150px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  &:hover {
    color: black;
  }
`;

// 취소 버튼
export const CancelButton = styled.button`
  border: none;
  color: #352f3b;
  margin-left: 95%;
  background-color: #e87369;
  cursor: pointer;
  font-size: 16px;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;
