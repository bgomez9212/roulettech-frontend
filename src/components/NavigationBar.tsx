interface NavigationBarProps {
  toggleModal: () => void;
}

export default function NavigationBar({ toggleModal }: NavigationBarProps) {
  return (
    <div>
      <div className="h-20 border flex flex-row justify-between px-5 md:px-20 items-center fixed bg-white w-[100vw]">
        <h1>Absolute Albums</h1>
        <button
          onClick={toggleModal}
          className="h-1/2 px-2 rounded-xl items-center justify-center flex border"
        >
          + Add an album
        </button>
      </div>
    </div>
  );
}
