import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "./theme-provider";
import { useAuth } from "@/hooks/use-auth";
import {
  Menu,
  Sun,
  Moon,
  GraduationCap,
  X,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background/90 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-bold text-lg shrink-0"
          data-testid="link-logo"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className={scrolled || !isHome ? "" : "text-white"}>
            <span className="hidden sm:inline">AI Data Science Academy</span>
            <span className="sm:hidden">AI DSA</span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate ${
                  scrolled || !isHome
                    ? "text-muted-foreground"
                    : "text-slate-300"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate ${
                  scrolled || !isHome
                    ? "text-muted-foreground"
                    : "text-slate-300"
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            className={scrolled || !isHome ? "" : "text-white"}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                <Button
                  size="sm"
                  variant="ghost"
                  data-testid="button-dashboard"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  {user.role === "admin" ? "Admin" : "Dashboard"}
                </Button>
              </Link>
              <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                <Avatar
                  className="w-8 h-8 cursor-pointer"
                  data-testid="avatar-user"
                >
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {user.avatarInitials || user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth">
                <Button
                  variant="ghost"
                  size="sm"
                  className={scrolled || !isHome ? "" : "text-white"}
                  data-testid="button-login"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm" data-testid="button-signup">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={`xl:hidden ${scrolled || !isHome ? "" : "text-white"}`}
                aria-label="Open menu"
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-display font-bold">AI DSA</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    data-testid="button-close-menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex flex-col gap-1">
                  {navLinks.map((link) =>
                    link.href.startsWith("#") ? (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 text-sm font-medium text-muted-foreground rounded-md hover-elevate"
                        data-testid={`mobile-link-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 text-sm font-medium text-muted-foreground rounded-md hover-elevate"
                        data-testid={`mobile-link-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>

                <div className="flex flex-col gap-2 pt-6 mt-6 border-t">
                  {user ? (
                    <>
                      <Link
                        href={user.role === "admin" ? "/admin" : "/dashboard"}
                        onClick={() => setOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          data-testid="mobile-button-dashboard"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          {user.role === "admin" ? "Admin Panel" : "Dashboard"}
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={async () => {
                          await logout();
                          setOpen(false);
                          setLocation("/");
                        }}
                        data-testid="mobile-button-logout"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth" onClick={() => setOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full"
                          data-testid="mobile-button-login"
                        >
                          Log In
                        </Button>
                      </Link>
                      <Link href="/auth" onClick={() => setOpen(false)}>
                        <Button
                          className="w-full"
                          data-testid="mobile-button-signup"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
