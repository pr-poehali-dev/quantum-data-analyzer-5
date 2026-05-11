export default function HeroTextOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
      <div className="mb-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5">
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">Эмоциональный интеллект</span>
      </div>
      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-tight"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        <span className="text-foreground">Чувствуй.</span>
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, hsl(262, 83%, 68%), hsl(195, 85%, 60%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Понимай.
        </span>
        <br />
        <span className="text-foreground">Расти.</span>
      </h1>
      <p className="text-muted-foreground text-base md:text-xl max-w-xl leading-relaxed mb-8">
        Научно обоснованная программа развития эмоционального интеллекта для подростков, родителей и педагогов
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a href="#audiences">
          <button
            className="px-8 py-3.5 rounded-full font-bold text-base text-primary-foreground transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(262, 83%, 68%), hsl(195, 85%, 60%))",
              boxShadow: "0 0 30px hsl(262 83% 68% / 0.4)",
            }}
          >
            Выбрать программу
          </button>
        </a>
        <a href="#about">
          <button className="px-8 py-3.5 rounded-full font-bold text-base text-foreground border border-border hover:border-primary/50 transition-all duration-300 hover:bg-primary/5">
            Узнать больше
          </button>
        </a>
      </div>
    </div>
  )
}
