"use client";

import { usePathname } from "next/navigation";
import { MobileFooterNavBase } from "@/components/site/MobileFooterNavBase";

export function MobileFooterNavClient() {
  const pathname = usePathname() || "/";
  return <MobileFooterNavBase activePath={pathname} />;
}
