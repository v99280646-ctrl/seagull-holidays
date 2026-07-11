import Link from "next/link";
import { Home, Briefcase, Hotel, Mail } from "lucide-react";

const mobileNav = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/packages", label: "Packages", icon: Briefcase },
  { to: "/resorts", label: "Resorts", icon: Hotel },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function MobileFooterNavBase({ activePath }: { activePath: string }) {
  const isActive = (to: string, exact?: boolean) => {
    if (exact) return activePath === to;
    return activePath === to || activePath.startsWith(`${to}/`);
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 px-2 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-1">
        {mobileNav.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-soft scale-[1.03]"
                  : "text-foreground/70 hover:bg-secondary hover:text-primary"
              }`}
            >
              <item.icon className={`h-4 w-4 ${active ? "text-primary-foreground" : ""}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
