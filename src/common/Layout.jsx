import React, { useEffect } from "react";
import * as S from "../styles/style.layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logout, signupSuccess } from "../redux/modules/signupSlice";
// import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // 회원가입 정보 가져오기
  const isSignupSuccess = useSelector((state) => state.signup.isSignupSuccess);
  const displayName = useSelector((state) => state.signup.displayName);

  // 사용자 인증 정보 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(signupSuccess(user.displayName));
      }
    });
    return () => unsubscribe();
    // 컴포넌트가 언마운트될 때 observer를 해제
  }, [dispatch]);

  // 로그아웃 버튼 핸들러
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("logout");

    await signOut(auth);
    dispatch(logout());

    // 로그아웃 후에 새로고침
    window.location.reload();
  };

  // 로그인, 회원가입 선택 페이지로 이동하는 함수
  const goLogin = () => {
    navigate("/login");
  };
  const goSingup = () => {
    navigate("/signup");
  };
  const goHome = () => {
    navigate("/home");
  };

  return (
    <S.LayoutContainer>
      {/* 헤더 영역 */}
      <S.HeaderBox>
        {/* 로고 및 토론 홈 링크 */}
        <S.HeaderDiv>
          <S.ComImg src="/image/header-computer.gif" alt="컴퓨터 이미지" />
          <S.HeaderLink onClick={goHome}>방구석 토론&nbsp;</S.HeaderLink>
          <S.CatImg1 src="/image/cat-walking.gif" alt="고양이 이미지" />
          <S.CatImg2 src="/image/cat-walking.gif" alt="고양이 이미지" />
          <S.CatImg3 src="/image/cat-walking.gif" alt="고양이 이미지" />
        </S.HeaderDiv>
        {/* 프로필 아이콘, 닉네임, 로그아웃 버튼 옆으로 나란히 배치 */}
        <S.CenteredContainer>
          <S.Nickname>
            {isSignupSuccess && (
              <>
                <S.DisplayName>
                  Hello, _{displayName}_{/* <CgProfile /> */}
                </S.DisplayName>
                <S.LogoutButton onClick={() => navigate(`/mypage/${id}`)}>Mypage</S.LogoutButton>
                <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
              </>
            )}
          </S.Nickname>
          {!isSignupSuccess && (
            <div>
              <S.ButtonStyles onClick={goLogin} textColor="ffffff">
                Login
              </S.ButtonStyles>
              <S.ButtonStyles onClick={goSingup} textColor="ffffff">
                Signup
              </S.ButtonStyles>
            </div>
          )}
        </S.CenteredContainer>
      </S.HeaderBox>

      {/* 페이지 컨텐츠 */}
      <S.PageContent>
        <Outlet />
      </S.PageContent>

      {/* 푸터 영역 */}
      <S.Footer>
        {/* <div>SNS 채널들</div> */}
        <S.FooterContent>
          <br />
          <S.HeaderDiv>
            <S.FooterTitle>구쪽이들</S.FooterTitle>
            <S.PlantImg src="/image/footer2.png" alt="화분 이미지" />
          </S.HeaderDiv>
          <S.LinkContainer>
            <S.LinkWrapper>
              <S.Name>김혜민</S.Name>
              <S.LinkIcon href="https://github.com/hyemin610" target="_blank" rel="noopener nore">
                <S.GitBtn src="/image/git.png" alt="깃 이미지" />
              </S.LinkIcon>
            </S.LinkWrapper>
            <S.LinkWrapper>
              <S.Name>안치훈</S.Name>
              <S.LinkIcon href="https://github.com/chihoonahn0319" target="_blank" rel="noopener nore">
                <S.GitBtn src="/image/git.png" alt="깃 이미지" />
              </S.LinkIcon>
            </S.LinkWrapper>
            <S.LinkWrapper>
              <S.Name>이수진</S.Name>
              <S.LinkIcon href="https://github.com/leesoojinn" target="_blank" rel="noopener nore">
                <S.GitBtn src="/image/git.png" alt="깃 이미지" />
              </S.LinkIcon>
            </S.LinkWrapper>
            <S.LinkWrapper>
              <S.Name>한희</S.Name>
              <S.LinkIcon href="https://github.com/han0111" target="_blank" rel="noopener nore">
                <S.GitBtn src="/image/git.png" alt="깃 이미지" />
              </S.LinkIcon>
            </S.LinkWrapper>
            <S.LinkWrapper>
              <S.Name>이예지</S.Name>
              <S.LinkIcon href="https://github.com/nna-na" target="_blank" rel="noopener nore">
                <S.GitBtn src="/image/git.png" alt="깃 이미지" />
              </S.LinkIcon>
            </S.LinkWrapper>
          </S.LinkContainer>
        </S.FooterContent>
      </S.Footer>
    </S.LayoutContainer>
  );
};

export default Layout;
