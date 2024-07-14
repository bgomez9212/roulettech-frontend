import { useQuery } from "@tanstack/react-query";

export default function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      fetch("http://127.0.0.1:8000/demo/articles/").then((res) => res.json()),
  });
  console.log(data);
  return (
    <div className="px-20 py-10">
      <h1>Hello world</h1>
    </div>
  );
}
