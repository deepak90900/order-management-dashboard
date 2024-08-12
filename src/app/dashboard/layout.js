import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  return (
    <>
      <SignedIn>
        <div className="flex h-screen bg-gray-100">
          <nav className="w-60 bg-gray-800 text-white flex flex-col justify-between p-5 shadow-lg">
            <ul className="space-y-4">
              {[
                { href: "/dashboard", label: "Home" },
                { href: "/dashboard/design", label: "Design" },
                { href: "/dashboard/print", label: "Print" },
                { href: "/dashboard/delivery", label: "Delivery" },
                {
                  href: "/dashboard/finished-orders",
                  label: "Finished Orders",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} passHref legacyBehavior>
                    <a className="block p-2 rounded hover:bg-gray-700 transition-all duration-200">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <UserButton />
            </div>
          </nav>
          <main className="flex-grow p-6 sm:p-10 bg-white shadow-inner overflow-y-auto">
            {children}
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="h-screen flex items-center justify-center">
          <RedirectToSignIn />
        </div>
      </SignedOut>
    </>
  );
}
