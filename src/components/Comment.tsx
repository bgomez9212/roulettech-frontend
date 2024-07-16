interface CommentProps {
  author: string | undefined;
  comment: string | undefined;
}

export default function Comment({ author, comment }: CommentProps) {
  return (
    <div className="w-full">
      <p className="font-bold">{author}</p>
      <p>{comment}</p>
    </div>
  );
}
