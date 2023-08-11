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
  width: 80%;
  height: 50px;
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
  color: white; /* 텍스트 색상 추가 */
  &::placeholder {
    color: #e87369; /* 플레이스홀더 색상 추가 */
  }

`;

export const BoldSpan = styled.span`
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: white; /* 텍스트 색상 추가 */
`;

export const ContentTextarea = styled.textarea`
  resize: none;
  width: 80%;
  height: 40%;
  font-size: 16px;
  border: 1px solid #e87369;
  padding: 8px;
  box-sizing: border-box;

  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  background-color: #352f3b;
  color: white;
  &::placeholder {
    color: #e87369;
  }

`;

export const CreateButton = styled.button`
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
