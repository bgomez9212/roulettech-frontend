import { ArticleType } from "../types";

interface ArticleProps {
  article: ArticleType;
}

export default function Article({ article }: ArticleProps) {
  return <div>{article.album_name}</div>;
}
