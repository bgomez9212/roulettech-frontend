interface CommentProps {
  author: string | undefined;
  comment: string | undefined;
  date: string | undefined;
}

export default function Comment({ author, comment, date }: CommentProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="font-bold">{author}</p>
        <p className="italic">{date}</p>
      </div>
      <p className="text-sm">{comment}</p>
    </div>
  );
}
