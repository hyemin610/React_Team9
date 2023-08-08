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
      const response = await axios.get(`http://localhost:4000/balances/${id}`);
      return response.data;
    }
  );

  const deleteBalance = useMutation(
    async (balance) => {
      await axios.delete(`http://localhost:4000/balances/${balance.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("balances");
        navigate("/balances"); // Redirect after successful deletion
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
    // Define the logic for edit button click
    // For example, navigate to the edit page with the current data
  };

  const handleDeleteClick = () => {
    deleteBalance.mutate(data); // Trigger the delete mutation
  };

  return (
    <>
      <detailHeader style={{ display: "flex" }}>
        <p>{data?.id}님의 논쟁입니다.</p>
        <button onClick={handleEditClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </detailHeader>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>{data?.title}</div>
        <button>{data?.choice1}</button>
        <div>VS</div>
        <button>{data?.choice2}</button>
      </div>
    </>
  );
}

export default Detail;
