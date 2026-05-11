import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const navLinks = [
  { label: "Педагогам", href: "#teachers" },
  { label: "Родителям", href: "#parents" },
  { label: "Ученикам", href: "#students" },
  { label: "О нас", href: "#about" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Э</span>
          </div>
          <span className="text-foreground font-bold text-lg tracking-wide" style={{ fontFamily: "var(--font-nunito)" }}>
            ЭмоИнтел
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden md:block">
            <Button className="bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
              Записаться <Icon name="ArrowUpRight" className="ml-1 h-4 w-4" />
            </Button>
          </a>
          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            <Button className="bg-primary text-primary-foreground rounded-full w-full">
              Записаться
            </Button>
          </a>
        </div>
      )}
    </header>
  )
}
