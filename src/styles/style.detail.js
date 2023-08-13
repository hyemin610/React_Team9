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
  margin-top: 10px;
`;

// 투표 choice1 버튼
export const VoteButton = styled.button`
  cursor: pointer;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: ${({ isActive }) => (isActive ? "gray" : "transparent")};
  border: 1px solid gray;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  margin-right: 50px;
  margin-left: 50px;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const VoteButton2 = styled.button`
  cursor: pointer;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: ${({ isActive }) => (isActive ? "gray" : "transparent")};
  border: 1px solid gray;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  margin-right: 50px;
  margin-left: 50px;
  color: white;
  &:hover {
    background-color: black;
    color: white;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export const CommentDiv = styled.div`
  margin-top: 30px;
  width: 600px;
`;
// 수정, 삭제 버튼
export const Button = styled.button`
  background-color: #e87369;
  border: none;
  font-weight: bolder;
  margin-left: 3px;
  margin-bottom: 15px;
  width: 100px;
  height: 40px;

  &:hover {
    color: white;
  }
`;

export const VoteResult = styled.div`
  margin: 0 auto;
`;

export const GoBack = styled.img`
  width: 150px;
  height: 100px;
  margin-right: 1200px;
  cursor: pointer;
  position: relative;
`;

// 작성자 닉네임 (ex: 나는 딸기가 좋아님의 논쟁입니다.)
export const AuthorDebate = styled.p`
  font-size: 2.5em;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* padding-bottom: 200px; */
`;

export const PostTitle = styled.div`
  font-size: 1.5em;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const PostContent = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  border: 1px solid white;
  padding: 10px 10px 10px 10px;
  width: 500px;
`;

// 투표 버튼
export const Vote = styled.div`
  margin-bottom: 30px;
`;

// 투표 퍼센트
export const VotePercent = styled.div`
  font-weight: bolder;
  font-size: large;
  margin-bottom: 10px;
`;
