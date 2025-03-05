export default function FolderView() {
  return (
    <div className="w-full h-[20rem] flex flex-col gap-3 justify-center items-center rounded-lg border border-neutral-700">
      <div className="w-[30%] flex flex-col gap-6 justify-center items-center text-center">
        <h1>No shared files to display</h1>
        <h1>Files shared to you by other employees will be listed here</h1>
      </div>
    </div>
  );
}
