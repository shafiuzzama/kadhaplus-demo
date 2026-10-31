import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-px flex min-h-[50vh] flex-col items-center justify-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-600">
          <Leaf className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold text-herbal-900">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </div>
    </section>
  );
}
