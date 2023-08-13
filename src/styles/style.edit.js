import { styled } from "styled-components";

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
  background-color: #352f3b;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
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
  background-color: #352f3b;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
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
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;

export const ContentTextarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 40%;
  font-size: 16px;
  border: 1px solid #e87369;
  padding: 8px;
  box-sizing: border-box;
  background-color: #352f3b;
  color: white;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */

  &::placeholder {
    color: #e87369;
  }
`;

export const EditButton = styled.button`
  height: 40px;
  border: none;
  color: #352f3b;
  border-radius: 8px;
  background-color: #e87369;
  cursor: pointer;
  font-size: 16px;
  min-width: 100px;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
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
  min-width: 20px;
  font-family: "DOSGothic", sans-serif; /* 글꼴 적용 */
`;
