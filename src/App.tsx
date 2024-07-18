import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Article from "./components/Article";
import { ArticleType } from "./types";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import AddAlbumModal from "./components/AddAlbumModal";
import CommentsModal from "./components/CommentsModal";

export default function App() {
  const [modalOpen, setModalOpen] = useState({
    albumModalVisible: false,
    commentModalVisible: false,
  });
  const [articleId, setArticleId] = useState<null | number>(null);
  const { isPending, error, data } = useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      fetch("http://127.0.0.1:8000/demo/articles/").then((res) => res.json()),
  });
  if (isPending) {
    return (
      <div className="flex items-center justify-center pt-20">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center pt-20">
        <h1>There seems to be an error</h1>
      </div>
    );
  }

  function toggleAlbumModal() {
    setModalOpen({
      ...modalOpen,
      albumModalVisible: !modalOpen.albumModalVisible,
    });
  }

  function toggleCommentModal(id: number | null) {
    setModalOpen({
      ...modalOpen,
      commentModalVisible: !modalOpen.commentModalVisible,
    });
    setArticleId(id);
  }

  return (
    <div>
      <NavigationBar toggleModal={toggleAlbumModal} />
      {modalOpen.albumModalVisible && (
        <AddAlbumModal toggleModal={toggleAlbumModal} />
      )}
      {modalOpen.commentModalVisible && (
        <CommentsModal
          toggleModal={() => toggleCommentModal(null)}
          articleId={articleId}
        />
      )}
      <div className="md:px-20 px-5 py-32 md:grid md:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-16">
        {data
          ?.slice(0)
          .reverse()
          .map((article: ArticleType) => (
            <Article
              key={article.id}
              article={article}
              toggleCommentModal={() => toggleCommentModal(article.id)}
            />
          ))}
      </div>
    </div>
  );
}
