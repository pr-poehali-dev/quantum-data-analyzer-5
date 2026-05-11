import { useState } from "react"
import Icon from "@/components/ui/icon"

const SUBMIT_URL = "https://functions.poehali.dev/776d844e-c702-4046-aea2-f11c98f4c8fc"

const audienceOptions = [
  { value: "teachers", label: "Педагог" },
  { value: "parents", label: "Родитель" },
  { value: "students", label: "Ученик" },
]

interface LeadFormProps {
  defaultAudience?: "teachers" | "parents" | "students"
  accentColor?: string
}

export default function LeadForm({ defaultAudience, accentColor = "hsl(262 83% 68%)" }: LeadFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [audience, setAudience] = useState(defaultAudience || "")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorText, setErrorText] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorText("")

    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, audience, message }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus("success")
      } else {
        setErrorText(data.error || "Что-то пошло не так")
        setStatus("error")
      }
    } catch {
      setErrorText("Ошибка сети. Попробуйте ещё раз.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-black mb-2" style={{ fontFamily: "var(--font-nunito)" }}>
          Заявка принята!
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Мы свяжемся с вами в ближайшее время. Спасибо за интерес к программе!
        </p>
      </div>
    )
  }

  const inputClass = "w-full bg-background border border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/60"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Ваше имя *</label>
          <input
            type="text"
            placeholder="Иван Иванов"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Телефон *</label>
          <input
            type="tel"
            placeholder="+7 (900) 000-00-00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Я записываюсь как *</label>
        <div className="grid grid-cols-3 gap-2">
          {audienceOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAudience(opt.value)}
              className="py-2.5 px-3 rounded-2xl border text-sm font-medium transition-all duration-200"
              style={{
                borderColor: audience === opt.value ? accentColor : "hsl(var(--border))",
                background: audience === opt.value ? `${accentColor.replace(")", " / 0.15)")}` : "transparent",
                color: audience === opt.value ? accentColor : "hsl(var(--muted-foreground))",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Комментарий (необязательно)</label>
        <textarea
          placeholder="Расскажите немного о вашей ситуации..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-2xl px-4 py-3">
          <Icon name="AlertCircle" size={15} />
          {errorText}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-full font-black text-white text-base transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: accentColor,
          boxShadow: `0 0 30px ${accentColor.replace(")", " / 0.35)")}`,
        }}
      >
        {status === "loading" ? (
          <>
            <Icon name="Loader2" size={18} className="animate-spin" />
            Отправляем...
          </>
        ) : (
          <>
            Записаться бесплатно
            <Icon name="ArrowUpRight" size={18} />
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  )
}
