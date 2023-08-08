import { styled } from "styled-components";

// 스타일 컴포넌트를 이용하여 헤더 영역을 스타일링
export const HeaderBox = styled.header`
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
`;

// 로고 및 토론 홈 링크를 스타일링
export const HeaderLink = styled.div`
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
export const HeaderButtonBox = styled.div`
  width: 33.333%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// 버튼 스타일 컴포넌트를 정의하여 스타일링
export const ButtonStyles = styled.button`
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
export const Footer = styled.footer`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #eeeeee;
  color: black;
`;

export const CenteredContainer = styled.div`
  text-align: center;
`;

// 닉네임
export const displayName = styled.div`
  font-weight: bolder;
  font-size: larger;
  margin-bottom: 20px;
  margin-right: 40px;
`;

// 로그인 되었을 때 나오는 로그아웃 버튼
export const LogoutButton = styled.button`
  border: none;
  margin-right: 30px;
  padding: 10px;
  border-radius: 6px;
  background-color: #fccae7;
  color: black;
  cursor: pointer;
  // #fccae7
  // #cafcf7
`;
