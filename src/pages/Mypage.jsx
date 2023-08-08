import * as S from "../styles/style.mypage";

export default function Mypage() {
  return (
    <>
      <S.Allpage>
        <div>
          <S.Profile>프로필사진</S.Profile>
          <S.Nickname>닉네임불러오기</S.Nickname>
        </div>
        <div>
          <S.Content>내용 불러오기</S.Content>
        </div>
      </S.Allpage>
    </>
  );
}
