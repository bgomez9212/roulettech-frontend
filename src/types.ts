export type ArticleType = {
  id: number;
  username: string;
  album_name: string;
  album_artist: string;
  article_text: string;
  imageUrl: string;
  likes: number;
  date: string;
};

export type CommentType = {
  id: number;
  username: string;
  comment: string;
  date: string;
  article_id: number | null;
};
