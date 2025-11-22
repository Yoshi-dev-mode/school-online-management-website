"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ onLogout }:any) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "/grid.png", href: "/" },
    { name: "Orders", icon: "/shopping-bag.png", href: "/orders" },
    { name: "Products", icon: "/box.png", href: "/products" },
    { name: "Logout", icon: "/logout.png", action: () => onLogout() },
  ];

  return (
    <aside className="pt-3 shadow-md sticky top-0 h-screen">
      <div className="flex items-center p-5">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={150} height={30} />
        </Link>
      </div>

      {menuItems.map((item) => {
        const isActive = pathname === item.href;

        // Logout Button
        if (item.action) {
          return (
            <button
              key={item.name}
              onClick={item.action}
              className="flex items-center px-10 py-4 w-full text-left cursor-pointer hover:bg-gray-100"
            >
              <Image src={item.icon} width={20} height={20} alt={item.name} />
              <h3 className="ml-3">{item.name}</h3>
            </button>
          );
        }

        // Normal navigation links
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-10 py-4 cursor-pointer transition ${
              isActive
                ? "bg-red-100 border-l-4 border-red-600 text-main-red font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <Image src={item.icon} width={20} height={20} alt={item.name} />
            <h3 className="ml-3">{item.name}</h3>
          </Link>
        );
      })}
    </aside>
  );
}
