import React, { useState } from "react";
import * as S from "../styles/style.login";
import { useNavigate, Link } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e?.preventDefault(); // 폼 제출 기본 동작 막기
    handleLogin(e); // 로그인 핸들러 호출
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
      const userCredential = await signInWithEmailAndPassword(auth, signInDatas.email, signInDatas.password);
      console.log("user with login", userCredential.user);

      alert("로그인에 성공했습니다.");
      navigate("/home");
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
    <S.BackgroundColor>
      <S.Container>
        <S.LoginBoxLocation>
          <S.LoginBorder>
            <Link to="/home">
              <S.CancelButton>X</S.CancelButton>
            </Link>
            <form onSubmit={handleSubmit}>
              <S.Login>LOGIN</S.Login>
              <S.Space>
                <S.Email placeholder="email" name="email" onChange={handleChange} />
              </S.Space>
              <S.Space>
                <S.Password placeholder="password" name="password" type="password" onChange={handleChange} />
              </S.Space>
              <S.Space>
                <S.LoginButton onClick={handleLogin}>ok</S.LoginButton>
              </S.Space>
            </form>
            <S.SignupLink to={"/signup"}>signup</S.SignupLink>
          </S.LoginBorder>
        </S.LoginBoxLocation>
      </S.Container>
    </S.BackgroundColor>
  );
}

export default Login;
