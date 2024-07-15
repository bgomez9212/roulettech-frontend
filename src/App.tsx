import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Article from "./components/Article";
import { ArticleType } from "./types";
import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import AddAlbumModal from "./components/AddAlbumModal";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
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

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  return (
    <div>
      <NavigationBar toggleModal={toggleModal} />
      {modalOpen && <AddAlbumModal toggleModal={toggleModal} />}
      <div className="px-20 py-32">
        {data.map((article: ArticleType) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
