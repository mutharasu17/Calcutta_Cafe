"use client";

import { usePathname } from "next/navigation";
import GSAPHeader from "@/components/layout/GSAPHeader";
import RetailFooter from "@/components/layout/RetailFooter";
import GSAPCartDrawer from "@/components/cart/GSAPCartDrawer";
import GSAPAddToCartToast from "@/components/cart/GSAPAddToCartToast";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <GSAPHeader />
      <main
        className={`relative min-h-screen ${
          isHome ? "pt-0" : "pt-[58px] sm:pt-[76px]"
        }`}
      >
        {children}
      </main>
      <RetailFooter />
      <GSAPCartDrawer />
      <GSAPAddToCartToast />
    </>
  );
}
