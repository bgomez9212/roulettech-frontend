import { useQuery } from "@tanstack/react-query";

interface CommentsModalProps {
  toggleModal: () => void;
  articleId: null | number;
}

export default function CommentsModal({
  toggleModal,
  articleId,
}: CommentsModalProps) {
  console.log(articleId);

  const {
    data: authorComment,
    isPending,
    error,
  } = useQuery({
    queryKey: ["authorComment"],
    queryFn: () =>
      fetch(`http://127.0.0.1:8000/demo/articles/${articleId}`).then((res) =>
        res.json()
      ),
    enabled: !!articleId,
  });

  console.log(authorComment);

  return (
    <div className="top-0 start-0 flex justify-center items-center fixed h-screen w-screen z-[50] no-doc-scroll">
      <div
        onClick={toggleModal}
        className="opacity-50 fixed top-0 start-0 z-[60] h-screen w-screen bg-black flex"
      />
      <div className="h-1/2 w-3/4 bg-white border shadow-xl z-[70] rounded-lg flex items-center flex-col"></div>
    </div>
  );
}
