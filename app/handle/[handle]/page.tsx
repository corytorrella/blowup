import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHandle, handles } from "@/lib/data";
import { InstigatorProfile } from "@/components/profile/InstigatorProfile";

export function generateStaticParams() {
  return handles.map((h) => ({ handle: h.handle }));
}

export function generateMetadata({ params }: { params: { handle: string } }): Metadata {
  const handle = getHandle(params.handle);
  return { title: handle ? `@${handle.handle}` : "Instigator" };
}

export default function HandleProfilePage({ params }: { params: { handle: string } }) {
  const handle = getHandle(params.handle);
  if (!handle) notFound();
  return <InstigatorProfile handle={handle} />;
}
