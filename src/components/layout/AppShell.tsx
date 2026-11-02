"use client";

import { usePathname } from "next/navigation";
import CinematicHeader from "@/components/layout/CinematicHeader";
import RetailFooter from "@/components/layout/RetailFooter";
import CartDrawer from "@/components/cart/CartDrawer";
import AddToCartToast from "@/components/cart/AddToCartToast";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <CinematicHeader />
      <main
        className={`relative min-h-screen ${
          isHome ? "pt-0" : "pt-[72px] sm:pt-[80px]"
        }`}
      >
        {children}
      </main>
      <RetailFooter />
      <CartDrawer />
      <AddToCartToast />
    </>
  );
}
