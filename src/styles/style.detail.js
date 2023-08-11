import { styled } from "styled-components";

export const FormContainer = styled.div`
  display: flex;
`;
export const selected = styled.div`
  background-color: #4caf50; //Green color
  color: white;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 3px solid;
  margin-top: 5px;
  padding-bottom: 20px;
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* 위쪽 간격 추가 */
`;

export const VoteButton = styled.button`
  cursor: pointer;
  padding: 15px 30px; /* 크기 조정 */
  font-size: 1.2rem; /* 크기 조정 */
  background-color: ${({ isActive }) => (isActive ? "gray" : "transparent")};
  border: 1px solid gray;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  margin-right: 50px;
  margin-left: 50px;

  &:hover {
    background-color: gray;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const CommentDiv = styled.div`
  margin-top: 30px;
  width: 600px;
  /* height: 100px; */
  // overflow: scroll;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  // flex-basis: 500px;
`;
// 수정, 삭제 버튼
export const Button = styled.button`
  background-color: #e87369;
  border: none;
  font-weight: bolder;
  margin-left: 3px;
  margin-bottom: 15px;
  width: 100px; /* 원하는 너비 설정 */
  height: 40px; /* 원하는 높이 설정 */

  &:hover {
    color: white; /* 변경할 글자 색 */
  }
`;

export const VoteResult = styled.div`
  margin: 0 auto;
`;

// 작성자 닉네임 (ex: 나는 딸기가 좋아님의 논쟁입니다.)
export const AuthorDebate = styled.p`
  font-size: 2em;
  font-weight: bolder;
`;

// 게시글 제목
export const PostTitle = styled.div`
  font-size: larger;
  font-weight: bold;
  margin-bottom: 20px;
`;

// 게시글 설명
export const PostContent = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  border: 1px solid white;
  padding: 10px 10px 10px 10px;
  width: 500px;
`;
