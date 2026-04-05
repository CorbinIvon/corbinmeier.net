import Link from "next/link";

export default function NotFound() {
  return (
    <div className="font-sans min-h-screen px-4 py-8 sm:px-8 sm:py-20">
      <main className="w-full max-w-3xl mx-auto flex flex-col gap-8 items-center text-center">
        <section className="py-6">
          <h1 className="text-6xl font-semibold mb-4 text-neutral-800">404</h1>
          <h2 className="text-2xl font-medium mb-4 text-neutral-700">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </Link>
        </section>
      </main>
    </div>
  );
}