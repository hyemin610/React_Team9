import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 최소 뷰포트 높이만큼 컨테이너를 확장 */
`;

// 스타일 컴포넌트를 이용하여 헤더 영역을 스타일링
export const HeaderBox = styled.header`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e87369;
  box-sizing: border-box;
  background-color: #352f3b;
  border-bottom: 1px solid #cccccc;
`;

// 로고 및 토론 홈 링크를 스타일링
export const HeaderLink = styled.div`
  text-align: left;
  text-decoration: none;
  color: #e87369;
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

export const ButtonStyles = styled.button`
  cursor: pointer;
  background-color: transparent;
  padding: 8px 20px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #999;
  transition: 0.3s ease-in-out;
  font-size: 1rem;
  color: white;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  @media (hover: hover) {
    &:hover {
      color: #${(props) => props.textColor};
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }
`;

export const PageContent = styled.div`
  flex-grow: 1; /* 페이지 컨텐츠 영역이 남은 높이를 모두 차지 */
`;

export const CenteredContainer = styled.div`
  text-align: center;
`;

// 닉네임
export const DisplayName = styled.button`
  font-weight: bolder;
  font-size: 35px;
  margin-bottom: 20px;
  margin-right: 40px;
  border: none;
  background-color: transparent;
  color: #e87369;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;

// 로그인 되었을 때 나오는 로그아웃 버튼
export const LogoutButton = styled.button`
  font-size: 25px;
  border: none;
  margin-left: 30px;
  padding: 10px;
  border-radius: 6px;
  background: none;
  color: white;
  height: 40px;
  cursor: pointer;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
  // #fccae7
  // #cafcf7
`;

export const Nickname = styled.div`
  display: flex;
  text-align: row;
  justify-content: space-between;
  margin-left: 50px;
`;

// 스타일 컴포넌트를 이용하여 푸터 영역을 스타일링
export const Footer = styled.footer`
  position: relative;
  bottom: 0;
  margin-top: 10px;
  background: #eeeeee;
  padding-top: 5px;
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
`;

export const FooterTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: rgb(110, 110, 110);
  margin-top: 10px;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #343434;
  margin-top: -30px;
`;

export const Name = styled.p`
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  width: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const LinkIcon = styled.a`
  max-width: 31px;
`;

export const GitBtn = styled.img`
  width: 31px;
`;

export const FooterText = styled.span`
  color: rgb(110, 110, 110);
  font-size: 12px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const ComImg = styled.img`
  width: 100px;
`;

export const CatImg1 = styled.img`
  width: 50px;
`;

export const CatImg2 = styled.img`
  width: 40px;
  padding-top: 10px;
  margin-left: 20px;
`;

export const CatImg3 = styled.img`
  width: 30px;
  padding-top: 20px;
  margin-left: 20px;
`;

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlantImg = styled.img`
  width: 50px;
  padding-bottom: 10px;
`;

export const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
