import type { Metadata } from "next";
import { getHandle, CURRENT_USER_HANDLE } from "@/lib/data";
import { InstigatorProfile } from "@/components/profile/InstigatorProfile";

export const metadata: Metadata = { title: "My Instigator Profile" };

export default function MyProfilePage() {
  const handle = getHandle(CURRENT_USER_HANDLE)!;
  return <InstigatorProfile handle={handle} isOwnProfile />;
}
