import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setAlertMessage } from "../redux/modules/commonSlice"; // 추가
import { setValidity, clearValidity } from "../redux/modules/validationSlice"; // 추가
import { validateInputAndAlert } from "../redux/modules/validationUtils"; // 추가
import * as S from "../styles/style.create";

function Create() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const displayName = useSelector((state) => state.signup.displayName);
  const dispatch = useDispatch(); // 추가
  const { id } = useParams();

  const addData = useMutation(
    async (newData) => {
      // axios를 사용하여 POST 요청을 보냄
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/balances`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("balances");
      },
    }
  );

  const handleCancel = () => {
    window.alert("Cancelled");
    navigate(`/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearValidity()); // 유효성 검사 상태 초기화

    const title = e.target.title.value;
    const content = e.target.content.value;
    const choice1 = e.target.choice1.value;
    const choice2 = e.target.choice2.value;

    if (validateInputAndAlert(title, content, choice1, choice2)) {
      return;
    }

    const newData = {
      id: nanoid(),
      title: title,
      choice1: choice1,
      choice2: choice2,
      content: content,
      author: displayName,
      vote1: 0,
      vote2: 0,
    };

    try {
      addData.mutate(newData);
      navigate("/");
    } catch (error) {
      console.error("Error adding data:", error);
      dispatch(setAlertMessage("데이터 추가 중 오류가 발생했습니다."));
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.CancelButton onClick={handleCancel}>X</S.CancelButton>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Create Debate</h1>

      <S.TitleInput name="title" placeholder="Please enter the title" />

      <S.ChoiceContainer>
        <S.ChoiceInput name="choice1" placeholder="choice1" />
        <S.BoldSpan>vs</S.BoldSpan>
        <S.ChoiceInput name="choice2" placeholder="choice2" />
      </S.ChoiceContainer>

      <S.ContentTextarea name="content" placeholder="Please enter the content" />

      <S.CreateButton type="submit">Create</S.CreateButton>
    </S.FormContainer>
  );
}

export default Create;
