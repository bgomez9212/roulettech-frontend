interface CommentsModalProps {
  toggleModal: () => void;
}

export default function CommentsModal({ toggleModal }: CommentsModalProps) {
  return (
    <div className="top-0 start-0 flex justify-center items-center fixed h-screen w-screen z-[50] no-doc-scroll">
      <div
        onClick={toggleModal}
        className="opacity-50 fixed top-0 start-0 z-[60] h-screen w-screen bg-black flex"
      />
      <div className="h-1/2 w-3/4 bg-white border shadow-xl z-[70] rounded-lg flex justify-center items-center flex-col">
        <p>Comments Modal</p>
      </div>
    </div>
  );
}
