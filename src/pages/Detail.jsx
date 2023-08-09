import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery(
    ["balances", id],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/balances/${id}`
      );
      return response.data;
      console.log("balance");
    }
  );

  const deleteBalance = useMutation(
    async (balance) => {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/balances/${balance.id}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("balances");
        navigate("/");
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const handleEditClick = () => {
    // if (post.author !== userEmail) {
    //   alert("게시글 작성자만 수정 가능합니다.");
    //   return;
    // }
    navigate(`/edit/${data.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteBalance.mutate(data);
    }
  };

  return (
    <>
      <detailHeader style={{ display: "flex" }}>
        <p>{data?.id}님의 논쟁입니다.</p>
        <button onClick={handleEditClick}>수정</button>
        <button
          onClick={handleDeleteClick}
          // onClick={() => {
          //   // if (post.author !== userEmail) {
          //   //   alert("게시글 작성자만 수정 가능합니다.");
          //   //   return;
          //   // }
          //   handleDeleteClick;
          // }}
        >
          삭제
        </button>
      </detailHeader>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>{data?.title}</div>
        <div>상황:{data?.content}</div>
        <button>{data?.choice1}</button>
        <div>VS</div>
        <button>{data?.choice2}</button>
      </div>
      <button>다음 논쟁</button>
    </>
  );
}

export default Detail;
