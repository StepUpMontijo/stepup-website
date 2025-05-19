/* eslint-disable @next/next/no-img-element */
export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <img
        src="https://http.cat/404"
        alt="404 Not Found Cat"
        className="max-w-full h-auto"
        style={{ maxHeight: "80vh" }}
      />
    </div>
  );
}
