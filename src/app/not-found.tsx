import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="mt-4 text-lg font-semibold">Page not found</p>
      <p className="mt-2 text-sm text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
        Go home
      </Link>
    </div>
  );
}
