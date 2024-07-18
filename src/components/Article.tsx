import { ArticleType } from "../types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

interface ArticleProps {
  article: ArticleType;
  toggleCommentModal: () => void;
}

export default function Article({ article, toggleCommentModal }: ArticleProps) {
  const [liked, setLiked] = useState(false);
  async function updateLikes() {
    if (liked) {
      article.likes -= 1;
    } else {
      article.likes += 1;
    }
    await fetch(`http://127.0.0.1:8000/demo/articles/${article.id}`, {
      method: "PATCH",
      body: JSON.stringify({ likes: article.likes }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  function handleClick() {
    setLiked(!liked);
    updateLikes();
  }

  return (
    <div className="py-7 px-8 mb-10 md:mb-0 flex flex-col border rounded-lg bg-white">
      <img className="mb-2" src={article.imageUrl} />
      <div className="flex justify-between">
        <div className="flex justify-center items-center mb-2">
          <button onClick={handleClick}>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
          {article.likes}
        </div>
        <div>
          <button onClick={toggleCommentModal}>
            <ChatOutlinedIcon />
          </button>
        </div>
      </div>
      <p className="font-bold text-2xl">{article.album_name}</p>
      <p className="italic pb-2">{article.album_artist}</p>
      <p>{article.username} says:</p>
      <div className="h-44 overflow-scroll ">
        <p>"{article.article_text}"</p>
      </div>
    </div>
  );
}
