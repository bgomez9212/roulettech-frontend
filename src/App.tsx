import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Article from "./components/Article";
import { ArticleType } from "./types";

export default function App() {
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

  return (
    <div className="px-20 py-10">
      {data.map((article: ArticleType) => (
        <Article article={article} />
      ))}
    </div>
  );
}
