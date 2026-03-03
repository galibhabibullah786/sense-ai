import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

/** Links shown on the landing page (Index). Hash links scroll to sections. */
const homeNavLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#extension", label: "Extension" },
  { href: "#contact", label: "Contact" },
];

/** On the /get-extension page, links point back to landing sections. */
const extensionNavLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/get-extension", label: "Extension" },
  { href: "/#contact", label: "Contact" },
];

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isHomePage = location.pathname === "/";
  const navLinks = isHomePage ? homeNavLinks : extensionNavLinks;

  // ── Intersection Observer for active section on home page ──────────────
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = homeNavLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.replace("#", ""));

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Pick the entry with the greatest intersection ratio currently on screen
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px", // trigger when section is roughly in upper-middle of viewport
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [isHomePage]);

  // ── Scroll shadow ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when drawer open ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrollToSection = useCallback(
    (href: string) => {
      setIsOpen(false);

      // Hash-only links: smooth-scroll on same page
      if (href.startsWith("#")) {
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      // "/#section" links: scroll if already on home, otherwise navigate
      if (href.startsWith("/#")) {
        if (isHomePage) {
          const id = href.replace("/#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // Navigate to home page with scroll target via React Router state
          navigate("/", { state: { scrollTo: href.replace("/#", "") } });
        }
        return;
      }

      // Regular route links
      navigate(href);
    },
    [navigate, isHomePage],
  );

  const isActive = (link: { href: string }) => {
    // Route-only links (e.g. /get-extension)
    if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
      return location.pathname === link.href;
    }
    // Hash or /#hash links: active when the corresponding section is in view on home page
    const sectionId = link.href.replace("/#", "").replace("#", "");
    return isHomePage && activeSection === sectionId;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass-strong shadow-lg" : "bg-transparent",
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SenseAI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(link)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side: Theme toggle + CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {isAuthenticated ? (
                <Button asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              )}
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-muted"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Drawer with dark overlay ─────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 z-[70] h-full w-72 bg-card border-l border-border shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-border">
                <span className="text-lg font-bold">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-left font-medium transition-colors",
                      isActive(link)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Drawer footer with CTA */}
              <div className="p-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <Button asChild className="w-full">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link to="/login" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
