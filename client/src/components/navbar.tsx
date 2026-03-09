import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "./theme-provider";
import { Menu, Sun, Moon, GraduationCap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Specializations", href: "#specializations" },
  { label: "Courses", href: "#courses" },
  { label: "Study Scheme", href: "#study-scheme" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href="#home"
          className="flex items-center gap-2.5 font-display font-bold text-lg shrink-0"
          data-testid="link-logo"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className={`${scrolled ? "" : "text-white"}`}>
            <span className="hidden sm:inline">AI Data Science Academy</span>
            <span className="sm:hidden">AI DSA</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate ${
                scrolled
                  ? "text-muted-foreground"
                  : "text-slate-300"
              }`}
              data-testid={`link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            className={scrolled ? "" : "text-white"}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`hidden sm:inline-flex ${scrolled ? "" : "text-white"}`}
            data-testid="button-login"
          >
            Log In
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" data-testid="button-signup">
            Sign Up
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={`lg:hidden ${scrolled ? "" : "text-white"}`}
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 text-sm font-medium text-muted-foreground rounded-md hover-elevate"
                    data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-4 mt-4 border-t">
                  <Button variant="ghost" data-testid="mobile-button-login">
                    Log In
                  </Button>
                  <Button data-testid="mobile-button-signup">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
