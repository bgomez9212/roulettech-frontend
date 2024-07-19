interface AddAlbumModalProps {
  toggleModal: () => void;
}
import { useForm } from "react-hook-form";
import { ArticleType } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
export default function AddAlbumModal({ toggleModal }: AddAlbumModalProps) {
  const [successMessage, setSuccessMessage] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<ArticleType>();
  async function onSubmit(data: ArticleType) {
    await fetch(`${import.meta.env.VITE_GET_ARTICLES}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    queryClient.invalidateQueries({ queryKey: ["articles"] });
    setSuccessMessage(true);
  }
  return (
    <div className="top-0 start-0 flex justify-center items-center fixed h-screen w-screen z-[50] no-doc-scroll">
      <div
        onClick={toggleModal}
        className="opacity-50 fixed top-0 start-0 z-[60] h-screen w-screen bg-black flex"
      />
      <div className="h-3/4 md:h-1/2 w-2/3 bg-white border shadow-xl z-[70] rounded-lg flex justify-center items-center flex-col">
        <p className="font-bold text-2xl pb-5 pt-5">Add an album</p>
        <form
          className="flex flex-col w-full justify-center items-center h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex md:flex-row flex-col w-full items-center justify-center px-4">
            <div className="flex flex-col gap-2 md:gap-4 md:mr-3 mr-0 md:w-1/2 justify-between md:h-full mb-2 md:mb-0">
              <input
                className="border rounded-lg p-2"
                placeholder="username"
                {...register("username")}
              />
              <input
                className="border rounded-lg p-2"
                placeholder="album name"
                {...register("album_name")}
              />
              <input
                className="border rounded-lg p-2"
                placeholder="artist"
                {...register("album_artist")}
              />
              <input
                className="border rounded-lg p-2"
                placeholder="image url"
                {...register("imageUrl")}
              />
            </div>
            <textarea
              className="resize-none border rounded-lg md:w-1/2 md:h-full p-2 h-60"
              placeholder="share your thoughts"
              {...register("article_text")}
            />
          </div>
          {successMessage ? (
            <p className="p-2">Thank you for your submission!</p>
          ) : (
            <input
              className="border rounded-lg p-2 bg-black text-white w-1/4 mt-5 cursor-pointer"
              type="submit"
            />
          )}
        </form>
      </div>
    </div>
  );
}
