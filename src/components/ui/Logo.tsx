import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/images/logo.jpg"
        alt={`${site.name} herbal wellness logo`}
        width={200}
        height={200}
        priority={priority}
        className="h-11 w-auto object-contain sm:h-12"
      />
    </Link>
  );
}
