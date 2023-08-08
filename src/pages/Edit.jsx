import React, { Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { validateInputAndAlert } from "../redux/validationUtils";
import * as S from "../styles/style.edit";

function Edit() {
  const navigate = useNavigate();

  // 동적 변수로 지정한(URL) id를 가져올 수 있다.
  const { id } = useParams();

  const queryClient = useQueryClient();

  // 해당 id의 게시물을 가져오는 React Query 쿼리
  const { data: balance } = useQuery(["post", id], async () => {
    const response = await axios.get(`http://localhost:4000/balances/${id}`);
    return response.data;
  });

  // 게시물 수정을 위한 Mutation
  const updateMutation = useMutation(
    async (updatedBalance) => {
      await axios.put(`http://localhost:4000/balances/${id}`, updatedBalance);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        window.alert("수정되었습니다.");
        navigate("/");
      },
    }
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const choice1 = e.target.choice1.value;
    const choice2 = e.target.choice2.value;

    if (validateInputAndAlert(title, content, choice1, choice2)) {
      return; // 유효성 검사 실패 시 중단
    }

    const updatedBalance = { ...balance, title, content, choice1, choice2 };

    updateMutation.mutate(updatedBalance);
  };

  const handleCancel = () => {
    window.alert("취소되었습니다.");
    navigate(`/detail/${id}`);
  };

  if (!balance) {
    return (
      <Fragment>
        <p>해당 게시물이 존재하지 않습니다.</p>
      </Fragment>
    );
  }

  return (
    <S.FormContainer onSubmit={handleEditSubmit}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>토론 만들기</h1>

      <S.TitleInput name="title" defaultValue={balance.title} placeholder="제목을 입력하세요" />

      <S.ChoiceContainer>
        <S.ChoiceInput name="choice1" defaultValue={balance.choice1} placeholder="겨울" />
        <S.BoldSpan>vs</S.BoldSpan>
        <S.ChoiceInput name="choice2" defaultValue={balance.choice2} placeholder="여름" />
      </S.ChoiceContainer>

      <S.ContentTextarea name="content" defaultValue={balance.content} placeholder="내용을 입력하세요" />

      <S.ButtonContainer>
        <S.EditButton type="submit">수정하기</S.EditButton>
        <S.CancelButton onClick={handleCancel}>취소하기</S.CancelButton>
      </S.ButtonContainer>
    </S.FormContainer>
  );
}

export default Edit;
