export default function NavigationBar() {
  return (
    <div className="h-20 border flex flex-row justify-between px-20 items-center">
      <h1>Absolute Albums</h1>
      <button className="h-1/2 px-2 rounded-xl items-center justify-center flex border">
        + Add an album
      </button>
    </div>
  );
}
