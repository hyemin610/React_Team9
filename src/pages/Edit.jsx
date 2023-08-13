import React, { Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { setAlertMessage } from "../redux/modules/commonSlice";
import { clearValidity } from "../redux/modules/validationSlice";
import { validateInputAndAlert } from "../redux/modules/validationUtils";
import * as S from "../styles/style.edit";
import { useDispatch } from "react-redux";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data: balance } = useQuery(["post", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/balances/${id}`
    );
    return response.data;
  });

  const updateMutation = useMutation(
    async (updatedBalance) => {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/balances/${id}`,
        updatedBalance
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        navigate(`/detail/${id}`);
      },
    }
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();

    dispatch(clearValidity()); // 유효성 검사 상태 초기화

    const title = e.target.title.value;
    const content = e.target.content.value;
    const choice1 = e.target.choice1.value;
    const choice2 = e.target.choice2.value;

    if (validateInputAndAlert(title, content, choice1, choice2)) {
      return;
    }

    const updatedBalance = { ...balance, title, content, choice1, choice2 };

    try {
      updateMutation.mutate(updatedBalance);
    } catch (error) {
      console.error("Error updating data:", error);
      dispatch(setAlertMessage("데이터 수정 중 오류가 발생했습니다."));
    }
  };

  const handleCancel = () => {
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
      <S.CancelButton onClick={handleCancel}>X</S.CancelButton>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>수정 하기</h1>
      <S.TitleInput
        name="title"
        defaultValue={balance.title}
        placeholder="제목을 입력해주세요"
      />
      <S.ChoiceContainer>
        <S.ChoiceInput
          name="choice1"
          defaultValue={balance.choice1}
          placeholder="딸기"
        />
        <S.BoldSpan>vs</S.BoldSpan>
        <S.ChoiceInput
          name="choice2"
          defaultValue={balance.choice2}
          placeholder="수박"
        />
      </S.ChoiceContainer>
      <S.ContentTextarea
        name="content"
        defaultValue={balance.content}
        placeholder="내용을 입력해주세요"
      />
      <S.EditButton type="submit">수정</S.EditButton>
    </S.FormContainer>
  );
}

export default Edit;
