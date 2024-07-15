import { ArticleType } from "../types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

interface ArticleProps {
  article: ArticleType;
}

export default function Article({ article }: ArticleProps) {
  return (
    <div className="py-[27px] px-[30px] flex flex-col w-96 border rounded-lg">
      <img className="mb-2" src={article.imageUrl} />
      <div className="flex justify-between">
        <div className="flex justify-center items-center mb-2">
          <button>
            <FavoriteBorderIcon />
          </button>
          {article.likes}
        </div>
        <div>
          <button>
            <ChatOutlinedIcon />
          </button>
        </div>
      </div>
      <p className="font-bold text-2xl">{article.album_name}</p>
      <p className="italic pb-2">{article.album_artist}</p>
      <p>{article.username} says:</p>
      <p>"{article.article_text}"</p>
    </div>
  );
}
