import React, { useState } from "react";
import * as S from "../styles/style.signup";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  // 로그인 정보
  const [signInDatas, setSignInDatas] = useState({
    email: "",
    password: "",
  });

  // email, nickname, password, passwordConfirm
  const handleChange = (e) => {
    e.preventDefault();

    setSignInDatas((signInData) => {
      return {
        ...signInData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // 로그인 버튼 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();

    // 로그인 유효성 검사
    // 이메일 필드가 비어있는지 확인
    if (!signInDatas.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // 비밀번호 필드가 비어있는지 확인
    if (!signInDatas.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInDatas.email,
        signInDatas.password
      );
      console.log("user with login", userCredential.user);

      alert("로그인에 성공했습니다.");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with signup", errorCode, errorMessage);

      // firebase 로그인 에러 발생 시 에러 처리
      switch (errorCode) {
        case "auth/invalid-email":
          alert("유효하지 않은 이메일 형식입니다.");
          break;
        case "auth/wrong-password":
          alert("이메일 또는 비밀번호가 올바르지 않습니다.");
          break;
        case "auth/user-not-found":
          alert("일치하는 정보가 없습니다.");
          break;
        default:
          alert(errorMessage);
          break;
      }
    }
  };

  return (
    <div>
      <S.Container>
        <S.SignupBoxLocation>
          <form>
            <S.Space>
              <S.Email
                placeholder="이메일"
                name="email"
                onChange={handleChange}
              />
            </S.Space>
            {/* <S.Space>
              <S.Nickname
                placeholder="닉네임"
                name="nickname"
                // onChange={handleChange}
              />
            </S.Space> */}
            <S.Space>
              <S.Password
                placeholder="비밀번호"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </S.Space>
            {/* <S.Space>
              <S.PassWordConfirm
                placeholder="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                // onChange={handleChange}
              />
            </S.Space> */}
            <S.Space>
              <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
            </S.Space>
            <S.SignupButton onClick={() => navigate("/signup")}>
              회원가입하러 가기
            </S.SignupButton>
          </form>
        </S.SignupBoxLocation>
      </S.Container>
    </div>
  );
}

export default Login;
