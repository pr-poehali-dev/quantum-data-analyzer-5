import { useState } from "react"
import { Link } from "react-router-dom"
import SplineScene from "@/components/SplineScene"
import Header from "@/components/Header"
import RotatingTextAccent from "@/components/RotatingTextAccent"
import Footer from "@/components/Footer"
import HeroTextOverlay from "@/components/HeroTextOverlay"
import Icon from "@/components/ui/icon"

const audienceData = [
  {
    id: "teachers",
    icon: "GraduationCap",
    color: "var(--color-teachers)",
    colorClass: "teachers",
    label: "Педагогам",
    tagline: "Инструменты для класса",
    description:
      "Научно обоснованные методики для создания эмоционально безопасной среды. Помогаем выстроить доверие, снизить конфликтность и повысить вовлечённость учеников.",
    skills: ["Управление классом через ЭИ", "Работа с тревожными детьми", "Эмпатийное общение", "Профилактика выгорания"],
    cta: "Программа для педагогов",
    href: "/teachers",
  },
  {
    id: "parents",
    icon: "Heart",
    color: "var(--color-parents)",
    colorClass: "parents",
    label: "Родителям",
    tagline: "Диалог без конфликтов",
    description:
      "Практические техники для понимания эмоционального мира подростка. Учимся слушать, а не осуждать — и строить настоящий контакт с ребёнком.",
    skills: ["Активное слушание", "Границы без давления", "Поддержка при стрессе", "Совместные ритуалы близости"],
    cta: "Программа для родителей",
    href: "/parents",
  },
  {
    id: "students",
    icon: "Sparkles",
    color: "var(--color-students)",
    colorClass: "students",
    label: "Ученикам",
    tagline: "Познай себя",
    description:
      "Интерактивные практики и игровые задания для развития самосознания, управления эмоциями и дружбы. Интересно, понятно и без скуки.",
    skills: ["Дневник эмоций", "Игры на эмпатию", "Техники самоуспокоения", "Навыки общения"],
    cta: "Программа для учеников",
    href: "/students",
  },
]

const pillars = [
  { icon: "Eye", title: "Самосознание", desc: "Умение распознавать свои эмоции, мысли и их влияние на поведение" },
  { icon: "Handshake", title: "Эмпатия", desc: "Понимание чувств других людей и способность сопереживать" },
  { icon: "Wind", title: "Саморегуляция", desc: "Управление импульсами и эмоциями в трудных ситуациях" },
  { icon: "Users", title: "Социальные навыки", desc: "Эффективное общение, разрешение конфликтов, сотрудничество" },
]

const practices = [
  {
    icon: "BookOpen",
    title: "Дневник эмоций",
    badge: "Рефлексия",
    badgeColor: "hsl(262 83% 68%)",
    desc: "Ежедневная практика записи эмоционального состояния. Помогает отслеживать паттерны и лучше понимать себя.",
    audience: "Все возрасты",
  },
  {
    icon: "Gamepad2",
    title: "Карточные игры ЭИ",
    badge: "Игровое обучение",
    badgeColor: "hsl(340 80% 65%)",
    desc: "Наборы карточек с ситуациями для обсуждения эмоциональных реакций в группах и парах.",
    audience: "10–17 лет",
  },
  {
    icon: "MessageCircle",
    title: "Круг чувств",
    badge: "Групповая практика",
    badgeColor: "hsl(195 85% 60%)",
    desc: "Структурированный круговой диалог, где каждый высказывается и чувствует себя услышанным.",
    audience: "Классы и семьи",
  },
  {
    icon: "Brain",
    title: "Техника «Пауза»",
    badge: "Саморегуляция",
    badgeColor: "hsl(262 83% 68%)",
    desc: "Дыхательные и телесные практики для снятия эмоционального напряжения за 3–5 минут.",
    audience: "С 8 лет",
  },
  {
    icon: "Star",
    title: "Карта сильных сторон",
    badge: "Самосознание",
    badgeColor: "hsl(40 90% 60%)",
    desc: "Инструмент для визуализации личных ресурсов и точек роста. Повышает уверенность в себе.",
    audience: "12–18 лет",
  },
  {
    icon: "Drama",
    title: "Ролевые сценарии",
    badge: "Эмпатия",
    badgeColor: "hsl(340 80% 65%)",
    desc: "Разыгрывание сложных социальных ситуаций для развития понимания разных точек зрения.",
    audience: "Педагоги и классы",
  },
]

const stats = [
  { value: "87%", label: "подростков отмечают снижение тревожности после курса" },
  { value: "3×", label: "улучшение школьной успеваемости при высоком ЭИ" },
  { value: "12+", label: "научно обоснованных практик в программе" },
  { value: "500+", label: "семей уже проходят программу" },
]

const QuizQuestion = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [step, setStep] = useState(0)

  const questions = [
    {
      q: "Когда ты злишься, что обычно помогает?",
      options: ["Побыть одному", "Поговорить с кем-то", "Подвигаться", "Написать о чувствах"],
    },
    {
      q: "Как ты понимаешь, что друг расстроен?",
      options: ["По взгляду и мимике", "Он говорит об этом", "Интуиция", "Задаю вопросы"],
    },
    {
      q: "Что для тебя труднее всего?",
      options: ["Контролировать гнев", "Говорить «нет»", "Принимать критику", "Просить о помощи"],
    },
  ]

  const isDone = step >= questions.length

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-xl mx-auto">
      {!isDone ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <span className="text-muted-foreground text-sm">Вопрос {step + 1} из {questions.length}</span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-8 rounded-full transition-colors"
                  style={{ background: i <= step ? "hsl(262 83% 68%)" : "hsl(var(--border))" }}
                />
              ))}
            </div>
          </div>
          <h3 className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-nunito)" }}>
            {questions[step].q}
          </h3>
          <div className="flex flex-col gap-3">
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="text-left px-5 py-3.5 rounded-2xl border transition-all duration-200 text-sm font-medium"
                style={{
                  borderColor: selected === i ? "hsl(262 83% 68%)" : "hsl(var(--border))",
                  background: selected === i ? "hsl(262 83% 68% / 0.15)" : "transparent",
                  color: "hsl(var(--foreground))",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setStep(step + 1); setSelected(null) }}
            disabled={selected === null}
            className="mt-5 w-full py-3 rounded-full font-bold text-sm transition-all duration-200"
            style={{
              background: selected !== null ? "hsl(262 83% 68%)" : "hsl(var(--muted))",
              color: selected !== null ? "white" : "hsl(var(--muted-foreground))",
              cursor: selected !== null ? "pointer" : "not-allowed",
            }}
          >
            Далее →
          </button>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "var(--font-nunito)" }}>
            Отлично!
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Ты прошёл мини-тест на эмоциональный интеллект. Запишись на полный курс — узнай свои сильные стороны!
          </p>
          <a href="#contact">
            <button
              className="px-8 py-3 rounded-full font-bold text-white text-sm"
              style={{ background: "hsl(262 83% 68%)" }}
            >
              Получить результат
            </button>
          </a>
        </div>
      )}
    </div>
  )
}

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <main className="w-full relative h-[700px]">
        <SplineScene />
        <HeroTextOverlay />
        <RotatingTextAccent />
      </main>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* Stats */}
        <section className="py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div
                className="text-4xl md:text-5xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, hsl(262, 83%, 68%), hsl(195, 85%, 60%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "var(--font-nunito)",
                }}
              >
                {s.value}
              </div>
              <p className="text-muted-foreground text-xs md:text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </section>

        {/* 4 pillars */}
        <section id="about" className="py-16">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Научный подход</span>
            <h2
              className="text-3xl md:text-5xl font-black mt-2 mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              4 компонента ЭИ
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Четыре ключевых навыка, которые помогают лучше понимать себя и других, справляться с трудностями и строить здоровые отношения.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="bg-card border border-border rounded-3xl p-6 card-hover"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "hsl(262 83% 68% / 0.15)" }}
                >
                  <Icon name={p.icon} size={24} style={{ color: "hsl(262 83% 68%)" }} />
                </div>
                <h3 className="font-black text-lg mb-2" style={{ fontFamily: "var(--font-nunito)" }}>{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Audiences */}
        <section id="audiences" className="py-16">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Программы</span>
            <h2
              className="text-3xl md:text-5xl font-black mt-2 mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Для каждой аудитории
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Каждая программа разработана с учётом возраста, роли и конкретных задач
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {audienceData.map((aud) => (
              <div
                key={aud.id}
                id={aud.id}
                className={`rounded-3xl border border-border p-8 md:p-12 gradient-${aud.colorClass} card-hover flex flex-col md:flex-row gap-8 items-start`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${aud.color} / 0.2`, backgroundColor: `hsl(${aud.color === "var(--color-teachers)" ? "262 83% 68%" : aud.color === "var(--color-parents)" ? "195 85% 60%" : "340 80% 65%"} / 0.2)` }}
                    >
                      <Icon name={aud.icon} size={24} style={{ color: `hsl(${aud.color === "var(--color-teachers)" ? "262 83% 68%" : aud.color === "var(--color-parents)" ? "195 85% 60%" : "340 80% 65%"})` }} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{aud.tagline}</span>
                      <h3 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>{aud.label}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">{aud.description}</p>
                  {aud.href.startsWith("/") ? (
                    <Link to={aud.href}>
                      <button
                        className="px-6 py-3 rounded-full font-bold text-sm text-white transition-all duration-300 hover:scale-105"
                        style={{
                          background: `hsl(${aud.color === "var(--color-teachers)" ? "262 83% 68%" : aud.color === "var(--color-parents)" ? "195 85% 60%" : "340 80% 65%"})`,
                        }}
                      >
                        {aud.cta} →
                      </button>
                    </Link>
                  ) : (
                    <a href="#contact">
                      <button
                        className="px-6 py-3 rounded-full font-bold text-sm text-white transition-all duration-300 hover:scale-105"
                        style={{
                          background: `hsl(${aud.color === "var(--color-teachers)" ? "262 83% 68%" : aud.color === "var(--color-parents)" ? "195 85% 60%" : "340 80% 65%"})`,
                        }}
                      >
                        {aud.cta} →
                      </button>
                    </a>
                  )}
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aud.skills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-background/60 border border-border rounded-2xl px-4 py-3 flex items-center gap-3"
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: `hsl(${aud.color === "var(--color-teachers)" ? "262 83% 68%" : aud.color === "var(--color-parents)" ? "195 85% 60%" : "340 80% 65%"})` }}
                      />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practices */}
        <section className="py-16">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Инструменты</span>
            <h2
              className="text-3xl md:text-5xl font-black mt-2 mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Игровые и рефлексивные практики
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Все материалы апробированы в школах и одобрены детскими психологами
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {practices.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-3xl p-6 card-hover flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${p.badgeColor}20` }}
                  >
                    <Icon name={p.icon} size={22} style={{ color: p.badgeColor }} />
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${p.badgeColor}20`, color: p.badgeColor }}
                  >
                    {p.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1" style={{ fontFamily: "var(--font-nunito)" }}>{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-auto pt-2 border-t border-border flex items-center gap-2">
                  <Icon name="Users" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{p.audience}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive quiz */}
        <section className="py-16">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Попробуй сейчас</span>
            <h2
              className="text-3xl md:text-5xl font-black mt-2 mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Мини-тест на ЭИ
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              3 вопроса — узнай, какое направление подойдёт именно тебе
            </p>
          </div>
          <QuizQuestion />
        </section>

        {/* CTA */}
        <section
          id="contact"
          className="py-20 mb-16 rounded-3xl text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(262 83% 68% / 0.15), hsl(195 85% 60% / 0.1))",
            border: "1px solid hsl(262 83% 68% / 0.3)",
          }}
        >
          <div className="absolute top-4 left-4 text-primary/20 text-6xl font-extralight">+</div>
          <div className="absolute top-4 right-4 text-primary/20 text-6xl font-extralight">+</div>
          <div className="absolute bottom-4 left-4 text-accent/20 text-6xl font-extralight">+</div>
          <div className="absolute bottom-4 right-4 text-accent/20 text-6xl font-extralight">+</div>

          <div className="relative z-10 px-6">
            <h2
              className="text-3xl md:text-5xl font-black mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Начни путь к эмоциональной зрелости
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
              Бесплатная первичная консультация для подростков и их семей
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@example.com">
                <button
                  className="px-10 py-4 rounded-full font-black text-lg text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, hsl(262, 83%, 68%), hsl(195, 85%, 60%))",
                    boxShadow: "0 0 40px hsl(262 83% 68% / 0.4)",
                  }}
                >
                  Записаться бесплатно
                </button>
              </a>
              <a href="tel:+79000000000">
                <button className="px-10 py-4 rounded-full font-bold text-lg border border-border hover:border-primary/50 transition-all duration-300 hover:bg-primary/5">
                  Позвонить нам
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default Index