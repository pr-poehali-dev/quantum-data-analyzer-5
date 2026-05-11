import Icon from "@/components/ui/icon"

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border mt-8">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">Э</span>
              </div>
              <span className="text-foreground font-bold text-lg" style={{ fontFamily: "var(--font-nunito)" }}>
                ЭмоИнтел
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Научно обоснованная программа развития эмоционального интеллекта для подростков, родителей и педагогов.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-widest uppercase text-muted-foreground">Программы</h4>
            <div className="flex flex-col gap-3">
              {["Для педагогов", "Для родителей", "Для учеников"].map((item) => (
                <a key={item} href="#audiences" className="text-foreground hover:text-primary transition-colors text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-widest uppercase text-muted-foreground">Контакты</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@example.com" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={15} />
                hello@example.com
              </a>
              <a href="tel:+79000000000" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                <Icon name="Phone" size={15} />
                +7 (900) 000-00-00
              </a>
              <div className="flex items-center gap-3 mt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Icon name="MessageCircle" size={15} className="text-foreground" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Icon name="Instagram" size={15} className="text-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-sm">© 2025 ЭмоИнтел. Все права защищены.</p>
          <p className="text-muted-foreground text-sm">poehali.dev</p>
        </div>
      </div>
    </footer>
  )
}
