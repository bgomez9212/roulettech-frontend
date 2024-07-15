import { ArticleType } from "../types";

interface ArticleProps {
  article: ArticleType;
}

export default function Article({ article }: ArticleProps) {
  return (
    <div className="py-[27px] px-[30px] flex flex-col w-96 border rounded-lg">
      <img src={article.imageUrl} />
      <div className="flex justify-between">
        <button>likes: {article.likes}</button>
        <button>comment</button>
      </div>
      <p>{article.album_name}</p>
      <p>{article.album_artist}</p>
      <p>{article.username} says:</p>
      <p>{article.article_text}</p>
    </div>
  );
}
