import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "../components/Comment"; // Import the Comment component

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const displayName = useSelector((state) => state.signup.displayName);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(["comments", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/comments`
    );
    return response.data;
  });

  const { data, isLoading, isError } = useQuery(["balances", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/balances/${id}`
    );
    return response.data;
  });

  const deleteBalance = useMutation(
    async (balanceId) => {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/balances/${balanceId}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("balances");
        navigate("/");
      },
    }
  );

  const handleEditClick = () => {
    navigate(`/edit/${data.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteBalance.mutate(data.id);
    }
  };

  if (isLoading || isCommentsLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isCommentsError) {
    return (
      <div>
        {isError && <div>Error loading post data</div>}
        {isCommentsError && <div>Error loading comments data</div>}
      </div>
    );
  }

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <detailHeader style={{ display: "flex" }}>
        {displayName === data.author ? (
          <div>
            <p>{data?.author}님의 논쟁입니다.</p>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
          </div>
        ) : (
          <p>{data?.author}님의 논쟁입니다.</p>
        )}
      </detailHeader>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>{data.title}</div>
        <div>상황: {data.comment}</div>
        <button>{data.choice1}</button>
        <div>VS</div>
        <button>{data.choice2}</button>
        <div>{data.content}</div>
      </div>
      <button>다음 논쟁</button>
      <Comment postId={data?.id} commentsData={commentsData} />
    </>
  );
}

export default Detail;
