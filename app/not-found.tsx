import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[100svh] max-w-lg flex-col justify-center px-5 text-center">
        <h1 className="font-display text-5xl">Wrong floor.</h1>
        <p className="mt-4 text-muted">That page isn’t on the corridor.</p>
        <Link href="/book" className="gold-btn mt-8">
          Book Aftermath
        </Link>
      </main>
    </>
  );
}
