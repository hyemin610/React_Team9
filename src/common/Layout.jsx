import React from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  // 로그인, 회원가입 선택 페이지로 이동하는 함수
  const goLogin = () => {
    navigate("/login");
  };
  const goSingup = () => {
    navigate("/signup");
  };
  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      {/* 헤더 영역 */}
      <HeaderBox>
        {/* 로고 및 토론 홈 링크 */}
        <HeaderLink onClick={goHome}>방구석 토론</HeaderLink>
        {/* 로그인 및 회원가입 버튼 */}
        <HeaderButtonBox>
          <ButtonStyles onClick={goLogin} textColor="7095F4">
            로그인
          </ButtonStyles>
          <ButtonStyles onClick={goSingup} textColor="7095F4">
            회원가입
          </ButtonStyles>
        </HeaderButtonBox>
      </HeaderBox>

      {/* 페이지 컨텐츠 */}
      <Outlet />

      {/* 푸터 영역 */}
      <Footer>
        <div>구쪽이들</div>
        <div>SNS 채널들</div>
      </Footer>
    </>
  );
};

// 스타일 컴포넌트를 이용하여 헤더 영역을 스타일링
const HeaderBox = styled.header`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
`;

// 로고 및 토론 홈 링크를 스타일링
const HeaderLink = styled.div`
  width: 33.333%;
  text-align: left;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  transition: 0.3s ease-in-out;
`;

// 로그인 및 회원가입 버튼을 담을 컨테이너를 스타일링
const HeaderButtonBox = styled.div`
  width: 33.333%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// 버튼 스타일 컴포넌트를 정의하여 스타일링
const ButtonStyles = styled.button`
  cursor: pointer;
  background-color: transparent;
  padding: 8px 20px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #000;
  transition: 0.3s ease-in-out;
  font-size: 1rem;
  @media (hover: hover) {
    &:hover {
      color: #${(props) => props.textColor};
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }
`;

// 스타일 컴포넌트를 이용하여 푸터 영역을 스타일링
const Footer = styled.footer`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #eeeeee;
  color: black;
`;

export default Layout;
