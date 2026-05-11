import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"
import LeadForm from "@/components/LeadForm"

const COLOR = "hsl(195 85% 60%)"
const COLOR_BG = "hsl(195 85% 60% / 0.12)"

const modules = [
  {
    num: "01",
    title: "Почему подросток «не слышит» родителей",
    desc: "В подростковом возрасте мозг переживает второй период бурного развития — особенно эмоциональные центры. Это объясняет резкие реакции, закрытость и кажущееся безразличие. Понимание этого снимает обиду и открывает путь к настоящему контакту.",
    keypoints: [
      "Подростковый мозг буквально не способен так же регулировать эмоции, как взрослый — это физиология",
      "Закрытость — это не манипуляция, а поиск автономии: нормальная стадия развития",
      "Контакт возможен — но на условиях подростка, не родителя",
    ],
  },
  {
    num: "02",
    title: "Как слушать, чтобы слышали вас",
    desc: "Активное слушание — это не молчать пока ребёнок говорит. Это полное присутствие: без телефона, без советов «не вовремя», без фраз «я в твои годы». Когда подросток чувствует, что его слышат — он начинает говорить.",
    keypoints: [
      "Слушайте лицом: смотрите в глаза, кивайте, не отвлекайтесь на гаджеты",
      "Отражайте: «Если я правильно понимаю, тебе сейчас обидно?» — это не повтор, а принятие",
      "Не спешите с советом — сначала спросите: «Ты хочешь, чтобы я помог или просто выслушал?»",
    ],
  },
  {
    num: "03",
    title: "Границы без давления",
    desc: "Граница — это не запрет, а договорённость. Подростки принимают ограничения, когда понимают их смысл и чувствуют уважение к себе. Авторитарный запрет рождает скрытность, объяснённое правило — доверие.",
    keypoints: [
      "Объясняйте причину: «Мне важно знать, где ты, потому что я беспокоюсь» работает лучше, чем «потому что я сказал»",
      "Договаривайтесь, а не ставьте ультиматумы — подросток охотнее соблюдает то, в создании чего участвовал",
      "Нарушение границы — повод поговорить, а не наказать автоматически",
    ],
  },
  {
    num: "04",
    title: "Ваши эмоции — ваша ответственность",
    desc: "Родитель — главный эмоциональный ориентир для ребёнка. Когда вы кричите от бессилия — вы не плохой родитель, вы человек. Но осознание своих эмоций и умение восстанавливаться — это то, что дети копируют и усваивают на всю жизнь.",
    keypoints: [
      "Называйте свои чувства вслух: «Я сейчас расстроен и мне нужно 10 минут» — это модель зрелости",
      "Извиняйтесь после срыва — это не слабость, а урок ответственности для ребёнка",
      "Заботьтесь о своём ресурсе: уставший родитель не может быть эмоционально присутствующим",
    ],
  },
]

const exercises = [
  {
    icon: "Coffee",
    title: "10 минут без повестки",
    time: "10 мин / день",
    audience: "Любой возраст",
    desc: "Каждый день проводите с подростком 10 минут без задач и проверок уроков. Просто вместе. Смотрите сериал, гуляйте, готовьте. Этот ритуал строит доверие лучше любого разговора.",
    steps: [
      "Выберите одно занятие, которое нравится вам обоим",
      "Договоритесь о времени — и соблюдайте его каждый день",
      "Никаких вопросов про школу, оценки или планы",
      "Если подросток молчит — это нормально, просто будьте рядом",
    ],
  },
  {
    icon: "Heart",
    title: "Я-сообщения",
    time: "В любой момент",
    audience: "Все возрасты",
    desc: "Замените обвинения на описание своих чувств. «Ты меня не слушаешь!» становится «Мне обидно, когда я говорю — а ты в телефоне». Это снижает защитную реакцию и открывает диалог.",
    steps: [
      "Формула: «Я чувствую [эмоция], когда [ситуация], потому что [причина]»",
      "Примените в следующем конфликте вместо привычной реакции",
      "Дайте ребёнку время ответить — не торопитесь",
      "После разговора спросите: «Как тебе было?»",
    ],
  },
  {
    icon: "MapPin",
    title: "Карта интересов ребёнка",
    time: "30 мин",
    audience: "Для родителей",
    desc: "Составьте список всего, что увлекает вашего подростка — игры, музыка, блогеры, мемы. Попросите его объяснить вам одно из этих увлечений. Искренний интерес — мощный инструмент сближения.",
    steps: [
      "Запишите 5–7 вещей, которыми интересуется ваш ребёнок",
      "Выберите одну — и попросите рассказать о ней подробнее",
      "Слушайте без оценок: «интересно, расскажи ещё»",
      "Поделитесь чем-то своим в ответ — взаимность создаёт мост",
    ],
  },
  {
    icon: "RefreshCw",
    title: "Ремонт после конфликта",
    time: "15–20 мин",
    audience: "После ссоры",
    desc: "Конфликт — не катастрофа, а точка роста. Важно то, что происходит после. Умение восстановить отношения — один из главных навыков эмоционального интеллекта в семье.",
    steps: [
      "Дайте обеим сторонам время остыть — не меньше 30 минут",
      "Первым подойдите вы: «Я хочу поговорить о том, что произошло»",
      "Признайте свою часть: «Я накричал — это было неправильно»",
      "Спросите: «Что тебе было нужно от меня в тот момент?»",
    ],
  },
]

const quizItems = [
  {
    q: "Подросток приходит домой злой и хлопает дверью. Ваша реакция?",
    options: [
      { text: "Требую объяснений — так себя не ведут", score: 1 },
      { text: "Даю остыть, потом говорю: «Хочешь — поговорим»", score: 4 },
      { text: "Делаю вид, что ничего не произошло", score: 2 },
      { text: "Иду следом и пытаюсь сразу выяснить причину", score: 2 },
    ],
  },
  {
    q: "Ребёнок говорит: «Ты меня не понимаешь». Что вы отвечаете?",
    options: [
      { text: "«Я всё для тебя делаю — как ты можешь так говорить»", score: 1 },
      { text: "«Возможно. Расскажи мне, что я упускаю»", score: 4 },
      { text: "«Ты сам ничего не объясняешь»", score: 2 },
      { text: "Молчу — не знаю, что сказать", score: 2 },
    ],
  },
  {
    q: "Как часто вы проводите время с подростком без «повестки» (без уроков, планов, нотаций)?",
    options: [
      { text: "Почти никогда — всегда что-то нужно обсудить", score: 1 },
      { text: "Иногда, но редко", score: 2 },
      { text: "Стараюсь регулярно — хотя бы раз в неделю", score: 3 },
      { text: "Да, это наш ежедневный ритуал", score: 4 },
    ],
  },
  {
    q: "Когда вы срываетесь на ребёнка, что происходит потом?",
    options: [
      { text: "Ничего — это моё право как родителя", score: 1 },
      { text: "Чувствую вину, но не говорю об этом", score: 2 },
      { text: "Извиняюсь, когда остываю", score: 3 },
      { text: "Говорю о случившемся и объясняю, почему так вышло", score: 4 },
    ],
  },
]

const resultLevels = [
  {
    min: 4,
    max: 8,
    title: "Есть куда расти",
    color: "hsl(340 80% 65%)",
    text: "Вы честны с собой — это уже важно. Начните с малого: попробуйте технику «Я-сообщений» и ежедневные 10 минут без повестки. Изменения в отношениях заметны уже через 2–3 недели.",
  },
  {
    min: 9,
    max: 12,
    title: "Хорошая основа",
    color: "hsl(40 90% 55%)",
    text: "Вы стараетесь слышать ребёнка и выстраивать контакт. Следующий шаг — научиться работать с собственными эмоциями в момент конфликта, не откладывая на потом.",
  },
  {
    min: 13,
    max: 16,
    title: "Эмоционально зрелый родитель",
    color: "hsl(195 85% 60%)",
    text: "Вы умеете слушать, восстанавливать контакт и брать ответственность за свои реакции. Это мощная основа для доверия. Продолжайте — и делитесь опытом с другими родителями.",
  },
]

export default function Parents() {
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
              <Icon name="Heart" size={15} style={{ color: COLOR }} />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "var(--font-nunito)" }}>Родителям</span>
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
            <Icon name="Heart" size={13} />
            Программа для родителей
          </div>
          <h1
            className="text-5xl md:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Диалог с подростком
            <br />
            <span style={{ color: COLOR }}>без конфликтов</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Теория о том, как устроен подростковый мозг, практики для восстановления контакта и тест на стиль общения в семье.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: "BookOpen", text: "4 теоретических модуля" },
              { icon: "Heart", text: "4 практики для семьи" },
              { icon: "ClipboardCheck", text: "Тест стиля общения" },
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
              <Icon name="Sparkles" size={18} style={{ color: COLOR }} />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Часть 2</p>
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Практики для семьи</h2>
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
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: COLOR }}>Как применить</p>
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
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Тест: стиль общения в семье</h2>
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
          style={{ background: "linear-gradient(135deg, hsl(195 85% 60% / 0.15), hsl(262 83% 68% / 0.08))", border: "1px solid hsl(195 85% 60% / 0.3)" }}
        >
          <div className="absolute top-4 left-4 opacity-20 text-5xl font-extralight" style={{ color: COLOR }}>+</div>
          <div className="absolute bottom-4 right-4 opacity-20 text-5xl font-extralight" style={{ color: COLOR }}>+</div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-2 text-center" style={{ fontFamily: "var(--font-nunito)" }}>
              Готовы восстановить контакт?
            </h2>
            <p className="text-muted-foreground mb-8 text-center">
              Бесплатная консультация — разберём вашу ситуацию и подберём подходящие практики
            </p>
            <LeadForm defaultAudience="parents" accentColor={COLOR} />
          </div>
        </section>
      </div>
    </div>
  )
}