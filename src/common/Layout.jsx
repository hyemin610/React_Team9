import React, { useEffect } from "react";
import * as S from "../styles/style.layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logout, signupSuccess } from "../redux/modules/signup";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  };

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
      <S.HeaderBox>
        {/* 로고 및 토론 홈 링크 */}
        <S.HeaderLink onClick={goHome}>방구석 토론</S.HeaderLink>
        {/* 로그인 및 회원가입 버튼 */}
        <S.HeaderButtonBox>
          {isSignupSuccess ? (
            <S.CenteredContainer>
              <S.displayName>{displayName}</S.displayName>
              <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
            </S.CenteredContainer>
          ) : (
            <div>
              <S.ButtonStyles onClick={goLogin} textColor="7095F4">
                로그인
              </S.ButtonStyles>
              <S.ButtonStyles onClick={goSingup} textColor="7095F4">
                회원가입
              </S.ButtonStyles>
            </div>
          )}
        </S.HeaderButtonBox>
      </S.HeaderBox>

      {/* 페이지 컨텐츠 */}
      <Outlet />

      {/* 푸터 영역 */}
      <S.Footer>
        <div>구쪽이들</div>
        <div>SNS 채널들</div>
      </S.Footer>
    </>
  );
};

export default Layout;
