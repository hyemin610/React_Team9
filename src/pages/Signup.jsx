import React, { useState } from "react";
import * as S from "../styles/style.signup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { signupSuccess } from "../redux/modules/signup";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 회원가입 정보
  const [signupDatas, setSignupDatas] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  // email, nickname, password, passwordConfirm
  const handleChange = (e) => {
    e.preventDefault();

    setSignupDatas((signupData) => {
      return {
        ...signupData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 회원가입 유효성 검사
    if (!signupDatas.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!signupDatas.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (signupDatas.password.length < 6) {
      alert("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }
    if (!signupDatas.password || !signupDatas.passwordConfirm) {
      alert("비밀번호 또는 비밀번호 확인을 확인해주세요.");
      return;
    }

    if (signupDatas.password !== signupDatas.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupDatas.email,
        signupDatas.password
      );
      console.log("user", userCredential.user);

      await updateProfile(userCredential.user, {
        displayName: signupDatas.nickname,
      });

      // 회원가입 성공 시 사용자 닉네임을 redux 상태에 저장
      dispatch(signupSuccess(signupDatas.nickname));

      alert("회원가입에 성공했습니다.");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with signup", errorCode, errorMessage);

      // firebase 회원가입 에러 발생 시 에러 처리
      switch (errorCode) {
        case "auth/invalid-email":
          alert("유효하지 않은 이메일 형식입니다.");
          break;
        case "auth/email-already-in-use":
          alert("이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.");
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
            <S.Space>
              <S.Nickname
                placeholder="닉네임"
                name="nickname"
                onChange={handleChange}
              />
            </S.Space>
            <S.Space>
              <S.Password
                placeholder="비밀번호"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </S.Space>
            <S.Space>
              <S.PassWordConfirm
                placeholder="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                onChange={handleChange}
              />
            </S.Space>
            <S.Space>
              <S.LoginButton onClick={handleSignup}>회원가입하기</S.LoginButton>
            </S.Space>
            {/* <S.SignupButton>로그인하러 가기</S.SignupButton> */}
          </form>
        </S.SignupBoxLocation>
      </S.Container>
    </div>
  );
}

export default Signup;
