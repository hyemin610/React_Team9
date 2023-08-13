import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      const { id, comment } = action.payload;
      const commentIndex = state.comments.findIndex((c) => c.id === id);
      if (commentIndex !== -1) {
        state.comments[commentIndex].comment = comment;
      }
    },
    deleteComment: (state, action) => {
      const { id } = action.payload;
      state.comments = state.comments.filter((c) => c.id !== id);
    },
  },
});

export const { addComment, updateComment, deleteComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
