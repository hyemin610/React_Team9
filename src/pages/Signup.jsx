import React from "react";
import * as S from "../styles/style.signup";

function Signup() {
  return (
    <div>
      <S.Container>
        <S.SignupBoxLocation>
          <form>
            <S.Space>
              <S.Email placeholder="이메일" name="email" />
            </S.Space>
            <S.Space>
              <S.Nickname placeholder="닉네임" name="nickname" />
            </S.Space>
            <S.Space>
              <S.Password
                placeholder="비밀번호"
                name="password"
                type="password"
              />
            </S.Space>
            <S.Space>
              <S.PassWordConfirm
                placeholder="비밀번호 확인"
                name="passwordConfirm"
                type="password"
              />
            </S.Space>
            <S.Space>
              <S.LoginButton type="submit">회원가입하기</S.LoginButton>
            </S.Space>
            <S.SignupButton>로그인하러 가기</S.SignupButton>
          </form>
        </S.SignupBoxLocation>
      </S.Container>
    </div>
  );
}

export default Signup;
