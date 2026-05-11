import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"
import LeadForm from "@/components/LeadForm"

const COLOR = "hsl(262 83% 68%)"
const COLOR_BG = "hsl(262 83% 68% / 0.12)"

const modules = [
  {
    num: "01",
    title: "Что такое эмоциональный интеллект",
    desc: "Эмоциональный интеллект (ЭИ) — это способность распознавать, понимать и управлять своими эмоциями, а также чутко реагировать на эмоции других людей. В педагогике ЭИ определяет качество отношений с учениками, способность создавать безопасную атмосферу и предотвращать конфликты.",
    keypoints: [
      "ЭИ можно развить в любом возрасте — это не врождённая черта",
      "Педагог с высоким ЭИ снижает уровень тревоги в классе",
      "Эмоциональный климат влияет на успеваемость сильнее, чем методика преподавания",
    ],
  },
  {
    num: "02",
    title: "Самосознание педагога",
    desc: "Первый шаг — научиться замечать свои эмоции в моменте. Когда вы осознаёте, что раздражены или тревожитесь, вы можете выбрать реакцию вместо того, чтобы действовать автоматически. Это особенно важно в классе, где дети мгновенно считывают состояние учителя.",
    keypoints: [
      "Ведите краткий дневник эмоций после уроков — 3 минуты в день",
      "Замечайте телесные сигналы: напряжение в плечах, сдавленный голос",
      "Различайте: «я устал» и «этот ученик меня раздражает» — разные вещи",
    ],
  },
  {
    num: "03",
    title: "Эмпатия в классе",
    desc: "Эмпатия — не согласие с учеником, а способность понять его точку зрения и чувства. Эмпатичный педагог не игнорирует поведение ребёнка, а задаётся вопросом: «Что за этим стоит?» Это меняет характер взаимодействия кардинально.",
    keypoints: [
      "Задавайте открытые вопросы: «Что сейчас происходит?» вместо «В чём проблема?»",
      "Называйте эмоцию вслух: «Вижу, что тебе сейчас сложно» — это разряжает напряжение",
      "Не путайте эмпатию с попустительством — границы остаются",
    ],
  },
  {
    num: "04",
    title: "Саморегуляция в трудных ситуациях",
    desc: "Конфликты, дерзость, апатия учеников — всё это проверяет эмоциональную устойчивость педагога. Саморегуляция — это не подавление эмоций, а умение выбрать момент и способ реакции осознанно.",
    keypoints: [
      "Техника «Пауза 6 секунд»: прежде чем ответить, сделайте вдох и посчитайте до 6",
      "Разделяйте срочное и важное: не каждая провокация требует немедленной реакции",
      "Восстановление после урока: 5 минут тишины или прогулка меняют следующий урок",
    ],
  },
]

const exercises = [
  {
    icon: "Circle",
    title: "Круг чувств",
    time: "10–15 мин",
    audience: "Любой возраст",
    desc: "В начале урока каждый ученик называет одно слово — своё состояние прямо сейчас. Педагог участвует тоже. Это создаёт контакт и снижает тревогу перед учёбой.",
    steps: [
      "Встаньте или сядьте в круг",
      "Каждый по очереди называет одно слово-эмоцию",
      "Без комментариев и оценок — просто слушаем",
      "Педагог благодарит класс за открытость",
    ],
  },
  {
    icon: "MessageSquare",
    title: "Ненасильственное общение",
    time: "20–30 мин",
    audience: "5–11 класс",
    desc: "Практика 4 шагов: наблюдение → чувство → потребность → просьба. Помогает разбирать конфликты без обвинений и учит конструктивному диалогу.",
    steps: [
      "Дайте ученикам конфликтную ситуацию (карточки)",
      "Попросите описать её по схеме: факт, чувство, потребность, просьба",
      "Разыграйте диалог двух сторон",
      "Обсудите: что изменилось бы с таким подходом?",
    ],
  },
  {
    icon: "Layers",
    title: "Карта эмоций класса",
    time: "5 мин",
    audience: "1–9 класс",
    desc: "Ученики анонимно отмечают своё настроение на бланке в начале недели. Педагог видит общий эмоциональный климат и может скорректировать план урока.",
    steps: [
      "Распечатайте бланк с эмодзи или словами-эмоциями",
      "Ученики ставят галочку рядом с тем, что чувствуют",
      "Педагог анализирует общую картину анонимно",
      "При необходимости адаптирует тон и темп урока",
    ],
  },
  {
    icon: "Zap",
    title: "Стоп-сигнал",
    time: "2–3 мин",
    audience: "Любой возраст",
    desc: "Быстрый инструмент для разрядки напряжения в классе в любой момент. Пять глубоких вдохов вместе снижают уровень кортизола и помогают вернуться к задаче.",
    steps: [
      "Скажите: «Стоп. Делаем паузу вместе»",
      "5 медленных вдохов через нос, выдох через рот",
      "Попросите потрясти руками и расслабить плечи",
      "Продолжайте урок — атмосфера изменится",
    ],
  },
]

const quizItems = [
  {
    q: "Ученик грубит вам на уроке. Ваша первая реакция?",
    options: [
      { text: "Сразу ставлю на место — нельзя допускать такого", score: 1 },
      { text: "Беру паузу, потом спокойно разбираюсь", score: 3 },
      { text: "Стараюсь понять, что с ним происходит", score: 4 },
      { text: "Растеряюсь и не знаю, как реагировать", score: 2 },
    ],
  },
  {
    q: "Как часто вы замечаете своё эмоциональное состояние во время урока?",
    options: [
      { text: "Практически никогда — некогда думать об этом", score: 1 },
      { text: "Только когда сильно устал или раздражён", score: 2 },
      { text: "Периодически — стараюсь следить за собой", score: 3 },
      { text: "Часто — это часть моей педагогической практики", score: 4 },
    ],
  },
  {
    q: "Ученик плачет на перемене. Что вы делаете?",
    options: [
      { text: "Жду, когда успокоится сам — не хочу лезть", score: 1 },
      { text: "Говорю: «Всё нормально, не расстраивайся»", score: 2 },
      { text: "Подхожу, спрашиваю, что случилось", score: 3 },
      { text: "Просто сижу рядом — даю понять, что я здесь", score: 4 },
    ],
  },
  {
    q: "После тяжёлого урока вы обычно:",
    options: [
      { text: "Злюсь на учеников или себя ещё несколько часов", score: 1 },
      { text: "Стараюсь не думать — переключаюсь на другое", score: 2 },
      { text: "Анализирую, что пошло не так", score: 3 },
      { text: "Даю себе время восстановиться и не виню себя", score: 4 },
    ],
  },
]

const resultLevels = [
  {
    min: 4,
    max: 8,
    title: "Начальный уровень",
    color: "hsl(340 80% 65%)",
    text: "Вы только начинаете путь осознанного педагога. Хорошая новость: ЭИ развивается быстро при регулярной практике. Начните с дневника эмоций и техники паузы.",
  },
  {
    min: 9,
    max: 12,
    title: "Развивающийся уровень",
    color: "hsl(40 90% 55%)",
    text: "Вы уже замечаете эмоции и стараетесь реагировать осознанно. Следующий шаг — развитие эмпатии и навыков ненасильственного общения с учениками.",
  },
  {
    min: 13,
    max: 16,
    title: "Высокий уровень",
    color: "hsl(262 83% 68%)",
    text: "Вы эмоционально зрелый педагог. Вы создаёте безопасный климат в классе и умеете работать с трудными ситуациями. Рекомендуем делиться опытом с коллегами.",
  },
]

export default function Teachers() {
  const [openModule, setOpenModule] = useState<number | null>(0)
  const [openExercise, setOpenExercise] = useState<number | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizDone, setQuizDone] = useState(false)

  const totalScore = quizAnswers.reduce((a, b) => a + b, 0)
  const result = resultLevels.find((r) => totalScore >= r.min && totalScore <= r.max)

  const handleAnswer = (score: number) => {
    const next = [...quizAnswers, score]
    setQuizAnswers(next)
    if (next.length === quizItems.length) setQuizDone(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm font-medium">На главную</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLOR_BG }}>
              <Icon name="GraduationCap" size={15} style={{ color: COLOR }} />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "var(--font-nunito)" }}>Педагогам</span>
          </div>
          <a href="#test">
            <button
              className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
              style={{ background: COLOR }}
            >
              Пройти тест
            </button>
          </a>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-20 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{ background: COLOR_BG, color: COLOR }}
          >
            <Icon name="GraduationCap" size={13} />
            Программа для педагогов
          </div>
          <h1
            className="text-5xl md:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Эмоциональный интеллект
            <br />
            <span style={{ color: COLOR }}>в классе</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Теория, готовые упражнения для уроков и тест на самодиагностику. Всё, что нужно педагогу для создания эмоционально здоровой среды.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: "BookOpen", text: "4 теоретических модуля" },
              { icon: "Gamepad2", text: "4 практики для класса" },
              { icon: "ClipboardCheck", text: "Тест самодиагностики" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
                <Icon name={b.icon} size={15} style={{ color: COLOR }} />
                <span className="text-sm font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Theory */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: COLOR_BG }}>
              <Icon name="BookOpen" size={18} style={{ color: COLOR }} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Часть 1</p>
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Теория</h2>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {modules.map((m, i) => (
              <div key={i} className="bg-card border border-border rounded-3xl overflow-hidden">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold" style={{ color: COLOR }}>{m.num}</span>
                    <span className="font-bold text-base" style={{ fontFamily: "var(--font-nunito)" }}>{m.title}</span>
                  </div>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className="flex-shrink-0 text-muted-foreground transition-transform"
                    style={{ transform: openModule === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {openModule === i && (
                  <div className="px-6 pb-6 border-t border-border pt-5">
                    <p className="text-muted-foreground leading-relaxed mb-5">{m.desc}</p>
                    <div className="flex flex-col gap-3">
                      {m.keypoints.map((kp, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: COLOR }} />
                          <p className="text-sm leading-relaxed">{kp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Exercises */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: COLOR_BG }}>
              <Icon name="Gamepad2" size={18} style={{ color: COLOR }} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Часть 2</p>
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Практики для класса</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {exercises.map((ex, i) => (
              <div key={i} className="bg-card border border-border rounded-3xl overflow-hidden">
                <button
                  className="w-full px-6 py-5 text-left"
                  onClick={() => setOpenExercise(openExercise === i ? null : i)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: COLOR_BG }}>
                      <Icon name={ex.icon} size={18} style={{ color: COLOR }} />
                    </div>
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className="text-muted-foreground transition-transform mt-2"
                      style={{ transform: openExercise === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                  <h3 className="font-black text-lg mb-1" style={{ fontFamily: "var(--font-nunito)" }}>{ex.title}</h3>
                  <div className="flex gap-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={11} /> {ex.time}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Users" size={11} /> {ex.audience}
                    </span>
                  </div>
                </button>

                {openExercise === i && (
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{ex.desc}</p>
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: COLOR }}>Как провести</p>
                    <ol className="flex flex-col gap-2">
                      {ex.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                            style={{ background: COLOR_BG, color: COLOR }}
                          >
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section id="test" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: COLOR_BG }}>
              <Icon name="ClipboardCheck" size={18} style={{ color: COLOR }} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Часть 3</p>
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Тест самодиагностики</h2>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 max-w-2xl">
            {!quizDone ? (
              <>
                {quizAnswers.length < quizItems.length && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-muted-foreground">
                        Вопрос {quizAnswers.length + 1} из {quizItems.length}
                      </span>
                      <div className="flex gap-1.5">
                        {quizItems.map((_, i) => (
                          <div
                            key={i}
                            className="h-1.5 w-8 rounded-full transition-colors"
                            style={{ background: i < quizAnswers.length ? COLOR : "hsl(var(--border))" }}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-6" style={{ fontFamily: "var(--font-nunito)" }}>
                      {quizItems[quizAnswers.length].q}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {quizItems[quizAnswers.length].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt.score)}
                          className="text-left px-5 py-4 rounded-2xl border transition-all duration-200 text-sm font-medium hover:border-primary/50 hover:bg-primary/5"
                          style={{ borderColor: "hsl(var(--border))" }}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-2xl font-black mb-1" style={{ fontFamily: "var(--font-nunito)" }}>
                    Ваш результат
                  </h3>
                  <p className="text-muted-foreground text-sm">Баллов: {totalScore} из 16</p>
                </div>

                {result && (
                  <div
                    className="rounded-2xl p-6 mb-6"
                    style={{ background: `${result.color}15`, border: `1px solid ${result.color}40` }}
                  >
                    <p className="text-sm font-bold mb-2" style={{ color: result.color }}>{result.title}</p>
                    <p className="text-sm leading-relaxed">{result.text}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => { setQuizAnswers([]); setQuizDone(false) }}
                    className="flex-1 py-3 rounded-full border border-border text-sm font-bold hover:bg-card transition-colors"
                  >
                    Пройти заново
                  </button>
                  <a href="#contact-block" className="flex-1">
                    <button
                      className="w-full py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                      style={{ background: COLOR }}
                    >
                      Записаться на курс
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact-block"
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(262 83% 68% / 0.15), hsl(195 85% 60% / 0.08))", border: "1px solid hsl(262 83% 68% / 0.3)" }}
        >
          <div className="absolute top-4 left-4 text-primary/20 text-5xl font-extralight">+</div>
          <div className="absolute bottom-4 right-4 text-primary/20 text-5xl font-extralight">+</div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-2 text-center" style={{ fontFamily: "var(--font-nunito)" }}>
              Готовы начать?
            </h2>
            <p className="text-muted-foreground mb-8 text-center">
              Бесплатная консультация — расскажем, как внедрить программу в вашей школе
            </p>
            <LeadForm defaultAudience="teachers" accentColor={COLOR} />
          </div>
        </section>
      </div>
    </div>
  )
}