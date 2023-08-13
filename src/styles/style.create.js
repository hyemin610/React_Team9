import styled from "styled-components";

export const FormContainer = styled.form`
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`;

export const TitleInput = styled.input`
  width: 60%;
  height: 40px;
  margin-bottom: 30px;
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #e87369;
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;
  justify-content: center;

  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  background-color: #352f3b;
  color: white;
  &::placeholder {
    color: #e87369;
  }
`;

export const ChoiceContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ChoiceInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border: 1px solid #e87369;
  padding: 4px;
  box-sizing: border-box;

  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  background-color: #352f3b;
  color: white;
  &::placeholder {
    color: #e87369;
  }
`;

export const BoldSpan = styled.span`
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const ContentTextarea = styled.textarea`
  resize: none;
  width: 80%;
  height: 40%;
  font-size: 16px;
  border: 1px solid #e87369;
  padding: 8px;
  box-sizing: border-box;
  background-color: #352f3b;
  color: #fff;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  &::placeholder {
    color: #e87369;
  }
`;

export const CreateButton = styled.button`
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
  width: 10%;
  height: 40px;
  border: none;
  color: #352f3b;
  cursor: pointer;
  font-size: 16px;
  background-color: #e87369;
`;

export const CancelButton = styled.button`
  height: 20px;
  border: none;
  color: #352f3b;
  margin-left: 80%;
  margin-top: 40px;
  background-color: #e87369;
  cursor: pointer;
  font-size: 16px;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
  min-width: 20px;
`;

// 댓글
export const CommentBox = styled.div`
  border: 3px solid white;
  padding: 10px;
  margin-bottom: 20px;
`;

export const CommentTitle = styled.div`
  font-weight: bolder;
  margin-bottom: 10px;
`;

export const CommentText = styled.div`
  font-weight: bold;
`;

export const AuthorNickname = styled.span`
  font-weight: bold;
  color: white;
`;

// 수정, 삭제 버튼
export const Button = styled.button`
  background-color: #e87369;
  border: none;
  font-weight: bolder;
  margin-left: 3px;
  margin-top: 5px;

  &:hover {
    color: white; /* 변경할 글자 색 */
  }
`;

export const Box = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 500px;
  overflow: auto;
`;

export const CommentEdit = styled.textarea`
  resize: none;
  font-size: 16px;
  border: 1px solid #e87369;
  padding: 8px;
  box-sizing: border-box;
  background-color: #352f3b;
  color: #fff;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  &::placeholder {
    color: #e87369;
  }
  width: 400px;
  height: 80px;
  resize: vertical;
`;
