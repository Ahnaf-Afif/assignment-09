import Link from "next/link";

export default function Example() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-black">
        <div className="text-5xl font-extrabold">
          This page is not found. THIS IS A 404!
        </div>
        <div className="text-2xl font-semibold">
          Want to go to the homepage?
        </div>
        <button className="btn btn-primary">
          <Link href="/">Home</Link>
        </button>
      </main>
    </>
  );
}
