interface AddAlbumModalProps {
  toggleModal: () => void;
}
import { useForm } from "react-hook-form";
import { ArticleType } from "../types";

export default function AddAlbumModal({ toggleModal }: AddAlbumModalProps) {
  const { register, handleSubmit } = useForm<ArticleType>();
  async function onSubmit(data: ArticleType) {
    await fetch("http://127.0.0.1:8000/demo/articles/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }
  return (
    <div className="top-0 start-0 flex justify-center items-center fixed h-screen w-screen z-[50] no-doc-scroll">
      <div
        onClick={toggleModal}
        className="opacity-50 fixed top-0 start-0 z-[60] h-screen w-screen bg-black flex"
      />
      <div className="h-1/2 w-3/4 bg-white border shadow-xl z-[70] rounded-lg flex justify-center items-center flex-col">
        <p className="font-bold text-2xl pb-5">Add an album</p>
        <form
          className="flex flex-col w-full justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col gap-4 mr-3 w-1/3">
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
              className="resize-none border rounded-lg w-1/3 h-full p-2"
              placeholder="share your thoughts"
              {...register("article_text")}
            />
          </div>
          <input
            className="border rounded-lg p-2 bg-black text-white w-1/4 mt-5 cursor-pointer"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
