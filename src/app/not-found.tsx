export default function NotFound() {
  return (
    <div
      className={`mt-20 flex min-h-[90dvh] flex-col items-center justify-center bg-base-200 p-8`}
    >
      <h1 className={`mb-2 text-center text-3xl font-bold `}>
        404: Page Not Found
      </h1>
      <p className={`text-center`}>
        This page does not exist. Please check the URL.
      </p>
    </div>
  );
}
