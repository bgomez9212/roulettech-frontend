import { useQuery, useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";
import { ArticleType, CommentType } from "../types";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";

interface CommentsModalProps {
  toggleModal: () => void;
  articleId: null | number;
}

export default function CommentsModal({
  toggleModal,
  articleId,
}: CommentsModalProps) {
  const queryClient = useQueryClient();
  const {
    data: authorComment,
    isPending: authorCommentPending,
    error: authorCommentError,
  } = useQuery<ArticleType>({
    queryKey: ["authorComment"],
    queryFn: () =>
      fetch(`http://127.0.0.1:8000/demo/articles/${articleId}`).then((res) =>
        res.json()
      ),
    enabled: !!articleId,
  });

  const {
    data: comments,
    isPending: commentsPending,
    error: commentsError,
  } = useQuery<CommentType[]>({
    queryKey: ["comments"],
    queryFn: () =>
      fetch(`http://127.0.0.1:8000/demo/articles/${articleId}/comments`).then(
        (res) => res.json()
      ),
    enabled: !!articleId,
  });

  const { register, handleSubmit } = useForm<CommentType>();

  async function onSubmit(data: CommentType) {
    data.article_id = articleId;
    await fetch(`http://127.0.0.1:8000/demo/comments/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    queryClient.invalidateQueries({ queryKey: ["comments"] });
  }

  return (
    <div className="top-0 start-0 flex justify-center items-center fixed h-screen w-screen z-[50] no-doc-scroll">
      <div
        onClick={toggleModal}
        className="opacity-50 fixed top-0 start-0 z-[60] h-screen w-screen bg-black flex"
      />
      <div className="h-1/2 w-3/4 bg-white border shadow-xl z-[70] rounded-lg flex items-center flex-col p-5">
        <div className="h-2/3 overflow-scroll w-full">
          {authorCommentError || commentsError ? (
            <p>There seems to be an error</p>
          ) : authorCommentPending || commentsPending ? (
            <ClipLoader />
          ) : (
            <Comment
              author={authorComment?.username}
              comment={authorComment?.article_text}
              date={authorComment?.date.slice(0, 10)}
            />
          )}
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              author={comment.username}
              comment={comment.comment}
              date={comment.date.slice(0, 10)}
            />
          ))}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-1/3 flex flex-col w-full rounded-md text-xs"
        >
          <textarea
            {...register("comment")}
            className="border resize-none h-2/3 mb-2 p-2"
            placeholder="(share your thoughts)"
          />
          <div className="flex justify-between rounded-md">
            <input
              {...register("username")}
              type="text"
              className="border px-2"
              placeholder="(comment as)"
            />
            <input type="submit" className="bg-black text-white text-lg px-2" />
          </div>
        </form>
      </div>
    </div>
  );
}
