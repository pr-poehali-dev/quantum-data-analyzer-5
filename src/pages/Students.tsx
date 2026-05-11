import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

const COLOR = "hsl(340 80% 65%)"
const COLOR_BG = "hsl(340 80% 65% / 0.12)"

const modules = [
  {
    num: "01",
    title: "Эмоции — это не слабость",
    desc: "Злость, страх, обида, радость — все эмоции нормальны. Проблема не в самих чувствах, а в том, что с ними делать. Тот, кто умеет называть свои эмоции, лучше справляется со стрессом, реже срывается и легче находит общий язык с другими.",
    keypoints: [
      "Учёные насчитывают более 27 базовых эмоций — большинство людей знают только 3–4",
      "Назвать эмоцию вслух уже снижает её интенсивность — это доказано нейронауками",
      "Все чувства допустимы, не все действия — важно различать эти два понятия",
    ],
  },
  {
    num: "02",
    title: "Как понять себя",
    desc: "Самосознание — это умение замечать, что происходит внутри. Не «у меня всё норм», а честный ответ: что я сейчас чувствую и почему? Это навык, который тренируется как мышца — чем чаще используешь, тем лучше работает.",
    keypoints: [
      "Тело всегда сигнализирует об эмоциях раньше, чем голова — учись его читать",
      "Задавай себе вопрос «что я сейчас чувствую?» хотя бы 3 раза в день",
      "Не оценивай свои эмоции как «плохие» или «хорошие» — просто замечай их",
    ],
  },
  {
    num: "03",
    title: "Понимать других",
    desc: "Эмпатия — это не значит соглашаться со всеми. Это значит уметь поставить себя на место другого человека и понять, почему он так себя ведёт. Люди с развитой эмпатией реже попадают в конфликты и легче заводят друзей.",
    keypoints: [
      "Когда кто-то злится — это почти всегда про боль или страх, а не про тебя лично",
      "Спроси себя: «Что этот человек сейчас чувствует?» — это меняет всё восприятие ситуации",
      "Эмпатия защищает от буллинга: тот, кто понимает чужую боль, не хочет её причинять",
    ],
  },
  {
    num: "04",
    title: "Управлять своими реакциями",
    desc: "Бывает, что эмоции захлёстывают и ты делаешь то, о чём потом жалеешь. Саморегуляция — это не «не чувствовать», а уметь сделать паузу и выбрать реакцию. Этот навык пригодится везде: в школе, с друзьями, в семье.",
    keypoints: [
      "«Стоп-дыхание»: 4 секунды вдох, 4 секунды держим, 6 секунд выдох — снижает панику мгновенно",
      "Физическая активность — лучший способ «сбросить» сильные эмоции",
      "Если хочется написать злое сообщение — подожди 10 минут. Обычно желание пропадает",
    ],
  },
]

const exercises = [
  {
    icon: "NotebookPen",
    title: "Дневник эмоций",
    time: "5 мин / день",
    audience: "С 10 лет",
    desc: "Каждый вечер записывай 3 вещи: что произошло, что ты почувствовал, как на это среагировал. Уже через неделю начнёшь замечать свои паттерны — и это реально круто.",
    steps: [
      "Возьми любой блокнот или заметки в телефоне",
      "Каждый вечер пиши: ситуация → эмоция → реакция",
      "Используй слова точнее: не «плохо», а «обидно», «растерян», «злюсь»",
      "Раз в неделю перечитай — что повторяется?",
    ],
  },
  {
    icon: "Palette",
    title: "Колесо эмоций",
    time: "10–15 мин",
    audience: "10–16 лет",
    desc: "Нарисуй круг и раздели его на 6 секторов — базовые эмоции. Внутри каждого запиши ситуации из своей жизни, когда ты это чувствовал. Это помогает расширить эмоциональный словарь.",
    steps: [
      "Нарисуй круг, раздели на 6 частей",
      "Запиши в каждой: радость, страх, злость, грусть, удивление, отвращение",
      "Для каждой эмоции вспомни ситуацию из своей жизни",
      "Придумай по 2–3 слова-синонима для каждой эмоции",
    ],
  },
  {
    icon: "Users",
    title: "Игра «Детектив эмоций»",
    time: "20 мин",
    audience: "Группа / класс",
    desc: "Один человек вытягивает карточку с эмоцией и изображает её без слов. Остальные угадывают. Потом обсуждаете: по каким сигналам догадались? Тренирует считывание невербальных сигналов.",
    steps: [
      "Напиши на карточках 10–15 разных эмоций",
      "По очереди тяните карточку и изображайте только мимикой и жестами",
      "Остальные угадывают — кто угадал, тот следующий",
      "Обсудите: что выдавало эмоцию? Взгляд, поза, руки?",
    ],
  },
  {
    icon: "Wind",
    title: "Техника «5-4-3-2-1»",
    time: "3–5 мин",
    audience: "При тревоге / стрессе",
    desc: "Если накрывает тревога или паника — эта техника возвращает в реальность за несколько минут. Работает через органы чувств и переключает мозг с тревоги на «здесь и сейчас».",
    steps: [
      "5 вещей, которые ты ВИДИШЬ прямо сейчас",
      "4 вещи, которые ты ЧУВСТВУЕШЬ телом (одежда, стул, воздух)",
      "3 звука, которые ты СЛЫШИШЬ",
      "2 запаха + 1 вкус — назови их вслух или про себя",
    ],
  },
]

const quizItems = [
  {
    q: "Ты поссорился с другом. Что ты обычно делаешь?",
    options: [
      { text: "Злюсь и не разговариваю несколько дней", score: 1 },
      { text: "Переживаю внутри, но первым не иду", score: 2 },
      { text: "Успокаиваюсь и потом пробую поговорить", score: 3 },
      { text: "Стараюсь понять, что произошло с обеих сторон", score: 4 },
    ],
  },
  {
    q: "Как ты понимаешь, что тебе сейчас плохо?",
    options: [
      { text: "Никак — просто что-то не так, но не пойму что", score: 1 },
      { text: "Чувствую это телом — усталость, напряжение", score: 2 },
      { text: "Замечаю, что стал раздражительным или закрытым", score: 3 },
      { text: "Умею точно назвать, что чувствую и почему", score: 4 },
    ],
  },
  {
    q: "Учитель несправедливо обругал тебя перед классом. Ты:",
    options: [
      { text: "Взрываюсь или грублю в ответ", score: 1 },
      { text: "Молчу, но внутри кипит", score: 2 },
      { text: "Говорю себе: «потом разберусь» и успокаиваюсь", score: 3 },
      { text: "После урока спокойно подхожу и говорю, что мне было обидно", score: 4 },
    ],
  },
  {
    q: "Друг расстроен, но не говорит почему. Что ты делаешь?",
    options: [
      { text: "Не лезу — сам расскажет, если захочет", score: 2 },
      { text: "Говорю: «Не грусти, всё будет норм»", score: 1 },
      { text: "Просто остаюсь рядом — дать понять, что я здесь", score: 3 },
      { text: "Аккуратно спрашиваю: «Хочешь поговорить или просто побыть вместе?»", score: 4 },
    ],
  },
]

const resultLevels = [
  {
    min: 4,
    max: 8,
    title: "Пока сложно разобраться",
    color: "hsl(340 80% 65%)",
    text: "Эмоции часто кажутся непонятными — и это нормально. Попробуй начать с дневника эмоций: 5 минут перед сном. Уже через неделю станет яснее, что происходит внутри.",
  },
  {
    min: 9,
    max: 12,
    title: "Ты на правильном пути",
    color: "hsl(40 90% 55%)",
    text: "Ты уже умеешь замечать свои состояния и иногда управляешь реакциями. Следующий шаг — развить эмпатию: попробуй игру «Детектив эмоций» с друзьями.",
  },
  {
    min: 13,
    max: 16,
    title: "Высокий эмоциональный интеллект",
    color: "hsl(195 85% 60%)",
    text: "Ты понимаешь себя и других, умеешь справляться с трудными ситуациями. Это большая сила — используй её, чтобы поддерживать тех, кому сложнее.",
  },
]

export default function Students() {
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
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm font-medium">На главную</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLOR_BG }}>
              <Icon name="Sparkles" size={15} style={{ color: COLOR }} />
            </div>
            <span className="font-bold text-sm" style={{ fontFamily: "var(--font-nunito)" }}>Ученикам</span>
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
            <Icon name="Sparkles" size={13} />
            Программа для учеников
          </div>
          <h1
            className="text-5xl md:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Познай себя
            <br />
            <span style={{ color: COLOR }}>и других</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Понятно о своих эмоциях, дружбе и стрессе. Интерактивные практики и тест — без скучных лекций.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: "BookOpen", text: "4 темы о себе и других" },
              { icon: "Gamepad2", text: "4 крутые практики" },
              { icon: "ClipboardCheck", text: "Тест на ЭИ" },
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
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Читай и узнавай</h2>
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
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Попробуй сам</h2>
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
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: COLOR }}>Как сделать</p>
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
              <h2 className="text-2xl font-black" style={{ fontFamily: "var(--font-nunito)" }}>Тест: какой у тебя ЭИ?</h2>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 max-w-2xl">
            {!quizDone ? (
              quizAnswers.length < quizItems.length && (
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
              )
            ) : (
              <div>
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">🔥</div>
                  <h3 className="text-2xl font-black mb-1" style={{ fontFamily: "var(--font-nunito)" }}>
                    Твой результат
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
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(340 80% 65% / 0.15), hsl(262 83% 68% / 0.08))", border: "1px solid hsl(340 80% 65% / 0.3)" }}
        >
          <div className="absolute top-4 left-4 opacity-20 text-5xl font-extralight" style={{ color: COLOR }}>+</div>
          <div className="absolute bottom-4 right-4 opacity-20 text-5xl font-extralight" style={{ color: COLOR }}>+</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10" style={{ fontFamily: "var(--font-nunito)" }}>
            Хочешь узнать себя лучше?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto relative z-10">
            Запишись на первое занятие — бесплатно и без скучных лекций
          </p>
          <a href="mailto:hello@example.com">
            <button
              className="px-10 py-4 rounded-full font-black text-white text-lg transition-all hover:scale-105"
              style={{ background: COLOR, boxShadow: "0 0 40px hsl(340 80% 65% / 0.35)" }}
            >
              Попробовать бесплатно
            </button>
          </a>
        </section>
      </div>
    </div>
  )
}
