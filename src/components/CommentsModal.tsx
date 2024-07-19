import { useQuery, useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";
import { ArticleType, CommentType } from "../types";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

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
      fetch(`${import.meta.env.VITE_GET_ARTICLES}${articleId}`).then((res) =>
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
      fetch(`${import.meta.env.VITE_GET_ARTICLES}${articleId}/comments`).then(
        (res) => res.json()
      ),
    enabled: !!articleId,
  });

  const { register, handleSubmit, reset } = useForm<CommentType>();

  async function onSubmit(data: CommentType) {
    data.article_id = articleId;
    await fetch(`${import.meta.env.VITE_GET_COMMENTS}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    queryClient.invalidateQueries({ queryKey: ["comments"] });
    reset();
  }

  return (
    <div className="top-0 start-0 flex justify-center items-center fixed h-screen w-screen z-[50] no-doc-scroll">
      <div
        onClick={toggleModal}
        className="opacity-50 fixed top-0 start-0 z-[60] h-screen w-screen bg-black flex"
      />
      <div className="h-1/2 w-3/4 bg-white border shadow-xl z-[70] rounded-lg flex items-center flex-col p-5 justify-between">
        <div className="w-full flex justify-end">
          <CloseIcon className="cursor-pointer" onClick={toggleModal} />
        </div>
        <div className="h-2/3 overflow-scroll w-full flex flex-col-reverse">
          {authorCommentError || commentsError ? (
            <p>There seems to be an error</p>
          ) : authorCommentPending || commentsPending ? (
            <ClipLoader />
          ) : (
            comments
              ?.slice(0)
              .reverse()
              .map((comment) => (
                <Comment
                  key={comment.id}
                  author={comment.username}
                  comment={comment.comment}
                  date={comment.date.slice(0, 10)}
                />
              ))
          )}
          {
            <Comment
              author={authorComment?.username}
              comment={authorComment?.article_text}
              date={authorComment?.date.slice(0, 10)}
            />
          }
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-1/3 flex flex-col w-full rounded-md text-xs"
        >
          <textarea
            {...register("comment")}
            className="border resize-none h-2/3 mb-2 p-2 rounded-md"
            placeholder="(share your thoughts)"
          />
          <div className="flex justify-between">
            <input
              {...register("username")}
              type="text"
              className="border px-2 rounded-md"
              placeholder="(comment as)"
            />
            <input
              type="submit"
              className="bg-black text-white text-lg px-2 rounded-md cursor-pointer hover:opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
