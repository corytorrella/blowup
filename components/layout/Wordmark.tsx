import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`label text-lg text-hazard tracking-wordmark hover:text-[#ffd633] ${className}`}
    >
      BLOWUP
    </Link>
  );
}
