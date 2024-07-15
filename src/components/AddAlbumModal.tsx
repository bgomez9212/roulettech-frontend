interface AddAlbumModalProps {
  toggleModal: () => void;
}

export default function AddAlbumModal({ toggleModal }: AddAlbumModalProps) {
  return (
    <div className="top-0 start-0 flex justify-center items-center fixed h-screen w-screen z-[50] no-doc-scroll">
      <div
        onClick={toggleModal}
        className="opacity-50 fixed top-0 start-0 z-[60] h-screen w-screen bg-black flex"
      />
      <div className="h-1/2 w-1/2 bg-white border border-red-700 z-[70]">
        Something is in here
      </div>
    </div>
  );
}
