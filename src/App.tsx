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

  function toggleCommentModal() {
    setModalOpen({
      ...modalOpen,
      commentModalVisible: !modalOpen.commentModalVisible,
    });
  }

  return (
    <div>
      <NavigationBar toggleModal={toggleAlbumModal} />
      {modalOpen.albumModalVisible && (
        <AddAlbumModal toggleModal={toggleAlbumModal} />
      )}
      {modalOpen.commentModalVisible && (
        <CommentsModal toggleModal={toggleCommentModal} />
      )}
      <div className="px-20 py-32 grid grid-cols-3 gap-x-16 gap-y-16">
        {data.map((article: ArticleType) => (
          <Article
            key={article.id}
            article={article}
            toggleCommentModal={toggleCommentModal}
          />
        ))}
      </div>
    </div>
  );
}
