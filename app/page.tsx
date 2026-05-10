'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, TrendingUp, Shield, Users, BarChart3, Building2, Star, Mail, MapPin } from 'lucide-react'

// Unsplash foto's — Europese kinderen in kinderopvang
const FOTOS = {
  hero:  'https://images.unsplash.com/photo-1620415064072-914373a92515?auto=format&fit=crop&w=1200&q=85',
  over:  'https://images.unsplash.com/photo-1612723353484-df83bf7e1c6b?auto=format&fit=crop&w=900&q=85',
  kind1: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80',
  kind2: 'https://images.unsplash.com/photo-1772435677424-9a45eec9a663?auto=format&fit=crop&w=600&q=80',
  kind3: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=600&q=80',
  kind4: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=600&q=80',
}

// ── Tokens ─────────────────────────────────────────────────────────────────────
const Y  = '#F4C542'   // geel
const YD = '#D4A017'   // geel donker
const BG = '#FAFAFA'   // lichtgrijs achtergrond
const TX = '#0A0A0A'   // tekst
const SM = '#6B7280'   // subtekst

function eur(n: number) {
  return new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

// ── Animatie wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] }}>
      {children}
    </motion.div>
  )
}

// ── Counter ────────────────────────────────────────────────────────────────────
function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!visible) return
    let v = 0
    const step = to / 50
    const t = setInterval(() => {
      v += step
      if (v >= to) { setN(to); clearInterval(t) }
      else setN(Math.floor(v))
    }, 25)
    return () => clearInterval(t)
  }, [visible, to])

  return <span ref={ref}>{n}{suffix}</span>
}

// ── Calculator ─────────────────────────────────────────────────────────────────
function Calculator() {
  const [inv, setInv] = useState(150000)
  const [pct, setPct] = useState(7)

  const jaar  = inv * pct / 100
  const maand = jaar / 12
  const n10   = inv + jaar * 10

  return (
    <section id="calculator" className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <Reveal className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: Y }}>Rekenmachine</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: TX }}>
            Bereken uw rendement
          </h2>
          <p className="text-lg" style={{ color: SM }}>Stel uw budget in. Het resultaat volgt direct.</p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-gray-100 bg-white p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Investering</span>
                <span className="text-3xl font-bold" style={{ color: TX }}>{eur(inv)}</span>
              </div>
              <input type="range" min={80000} max={500000} step={5000} value={inv}
                onChange={e => setInv(+e.target.value)} />
              <div className="flex justify-between text-xs text-gray-300 mt-2">
                <span>€ 80.000</span><span>€ 500.000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">Rendement / jaar</span>
                <span className="text-3xl font-bold" style={{ color: TX }}>{pct}%</span>
              </div>
              <input type="range" min={4} max={9} step={0.5} value={pct}
                onChange={e => setPct(+e.target.value)} />
              <div className="flex justify-between text-xs text-gray-300 mt-2">
                <span>4%</span><span>9%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              ['Per maand',  eur(maand)],
              ['Per jaar',   eur(jaar) ],
              ['Na 10 jaar', eur(n10)  ],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl p-5 bg-gray-50 border border-gray-100">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">{l}</p>
                <p className="text-xl font-bold" style={{ color: TX }}>{v}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 flex items-center justify-between gap-4"
            style={{ background: Y }}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-900/50 mb-1">Totale winst na 10 jaar</p>
              <p className="text-2xl font-bold" style={{ color: TX }}>{eur(n10 - inv)}</p>
            </div>
            <a href="#contact" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-white hover:bg-gray-50 transition-colors shadow-sm" style={{ color: TX }}>
              Interesse <ArrowRight size={14} />
            </a>
          </div>

          <p className="text-xs text-gray-300 text-center mt-5">Louter indicatief. Geen garantie op rendement.</p>
        </Reveal>
      </div>
    </section>
  )
}

// ── Contactformulier ───────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm]     = useState({ naam: '', email: '', telefoon: '', budget: '', bericht: '' })
  const [status, setStatus] = useState<'idle'|'bezig'|'ok'|'fout'>('idle')

  async function send(e: React.FormEvent) {
    e.preventDefault()
    setStatus('bezig')
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setStatus(r.ok ? 'ok' : 'fout')
  }

  const inp = "w-full rounded-xl px-4 py-3.5 text-sm border border-gray-200 bg-white placeholder-gray-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-50 transition-all"

  return (
    <section id="contact" className="py-32 px-6" style={{ background: BG }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-16 items-start">

        {/* Links — tekst */}
        <Reveal className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: Y }}>Contact</p>
          <h2 className="text-4xl font-bold tracking-tight mb-5" style={{ color: TX }}>
            Laat van<br />u horen.
          </h2>
          <p className="text-[15px] leading-relaxed mb-10" style={{ color: SM }}>
            We nemen binnen 48 uur contact op voor een vertrouwelijk gesprek over de mogelijkheden.
          </p>
          <div className="space-y-4">
            {[
              { l: 'Snel antwoord',          s: 'Reactie binnen 48 uur' },
              { l: 'Volledig vertrouwelijk',  s: 'Nooit gedeeld met derden' },
              { l: 'Voorstel op maat',        s: 'Na persoonlijk gesprek' },
            ].map(({ l, s }) => (
              <div key={l} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: Y }}>
                  <Check size={11} strokeWidth={3} style={{ color: TX }} />
                </div>
                <div>
                  <span className="text-sm font-medium" style={{ color: TX }}>{l}: </span>
                  <span className="text-sm" style={{ color: SM }}>{s}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Rechts — formulier */}
        <Reveal delay={0.12} className="md:col-span-3">
          {status === 'ok' ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: Y }}>
                <Check size={26} strokeWidth={2.5} style={{ color: TX }} />
              </div>
              <p className="text-xl font-bold mb-2" style={{ color: TX }}>Bericht ontvangen</p>
              <p className="text-sm" style={{ color: SM }}>We nemen binnenkort contact op.</p>
            </div>
          ) : (
            <form onSubmit={send} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">Naam *</label>
                  <input required value={form.naam} onChange={e => setForm({ ...form, naam: e.target.value })} placeholder="Volledige naam" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">Telefoon *</label>
                  <input required type="tel" value={form.telefoon} onChange={e => setForm({ ...form, telefoon: e.target.value })} placeholder="04XX XX XX XX" className={inp} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">E-mail *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="uw@email.be" className={inp} />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">Budget *</label>
                <select required value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className={inp + ' appearance-none cursor-pointer'}>
                  <option value="">Selecteer uw budget</option>
                  <option>€ 80.000 tot € 150.000</option>
                  <option>€ 150.000 tot € 300.000</option>
                  <option>€ 300.000 tot € 500.000</option>
                  <option>€ 500.000 of meer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-2">Bericht <span className="text-gray-200 font-normal normal-case">(optioneel)</span></label>
                <textarea value={form.bericht} onChange={e => setForm({ ...form, bericht: e.target.value })} rows={3} placeholder="Vragen of opmerkingen" className={inp + ' resize-none'} />
              </div>
              {status === 'fout' && <p className="text-xs text-red-500">Er liep iets mis. Probeer opnieuw.</p>}
              <button type="submit" disabled={status === 'bezig'}
                className="w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-85 disabled:opacity-40"
                style={{ background: Y, color: TX }}>
                {status === 'bezig' ? 'Versturen…' : <><span>Stuur mijn interesse</span><ArrowRight size={15} /></>}
              </button>
              <p className="text-xs text-center text-gray-300">Strikt vertrouwelijk · Nooit gedeeld met derden</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

// ── Hoofdpagina ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="bg-white">

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-base font-bold tracking-tight" style={{ color: TX }}>
            Opvang<span style={{ color: Y }}>Kapitaal</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: SM }}>
            <a href="#over"       className="hover:text-gray-900 transition-colors">Over ons</a>
            <a href="#waarom"     className="hover:text-gray-900 transition-colors">Voordelen</a>
            <a href="#model"      className="hover:text-gray-900 transition-colors">Model</a>
            <a href="#calculator" className="hover:text-gray-900 transition-colors">Rekenmachine</a>
          </div>
          <a href="#contact"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-85"
            style={{ background: Y, color: TX }}>
            Plan een gesprek
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center pt-16 px-6 overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, #F4C54210 0%, transparent 65%)' }} />
        </div>

        <div className="max-w-5xl mx-auto w-full py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

            {/* Links — tekst */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] mb-8 border"
                style={{ borderColor: '#F4C54250', background: '#FFF8E150', color: '#92400e' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: Y }} />
                Investeerdersoproep Oost-Vlaanderen
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-6"
                style={{ color: TX }}>
                Investeren in<br />
                <span style={{ color: Y }}>kinderopvang</span><br />
                met rendement.
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Opvang Kapitaal bouwt een erkende crèche voor 28 kinderen in Oost-Vlaanderen. Stabiel rendement via dubbele inkomstenstroom. Instap vanaf € 80.000.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="#calculator"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold transition-all hover:opacity-85"
                  style={{ background: Y, color: TX }}>
                  Bereken uw rendement <ArrowRight size={15} />
                </a>
                <a href="#contact"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-all">
                  Plan een gesprek
                </a>
              </div>
            </motion.div>

            {/* Rechts — kinderfoto */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}>
              <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-amber-100">
                <Image
                  src={FOTOS.kind1}
                  alt="Gelukkige kinderen in een crèche"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <p className="text-xs font-semibold" style={{ color: TX }}>Professionele opvang voor 0 tot 3 jaar</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-gray-100">
              {[
                { n: 28, s: '',  l: 'Opvangplaatsen', sub: '0 tot 3 jaar' },
                { n: 18, s: '+', l: 'Mnd wachtlijst',  sub: 'Oost-Vlaanderen' },
                { n: 80, s: 'K', l: 'Min. instap (€)', sub: 'Per investeerder' },
              ].map(st => (
                <div key={st.l} className="bg-gray-50 py-6 px-5 text-center">
                  <p className="text-4xl font-bold mb-0.5" style={{ color: TX }}>
                    <Count to={st.n} suffix={st.s} />
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mb-0.5">{st.l}</p>
                  <p className="text-[11px] text-gray-400">{st.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Markt — donkere balk ── */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: Y }}>De markt</p>
              <p className="text-2xl font-bold text-white leading-tight">
                Een sector die de vraag structureel niet bijhoudt.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-10">
              {[
                { n: 33,   s: '',   l: 'plaatsen / 100 kinderen', c: '#ef4444' },
                { n: 18,   s: '+',  l: 'maanden wachten',          c: Y        },
                { n: 95,   s: '%',  l: 'bezettingsgraad sector',   c: '#22c55e' },
              ].map(st => (
                <div key={st.l} className="text-center">
                  <p className="text-4xl font-bold mb-1" style={{ color: st.c }}>
                    <Count to={st.n} suffix={st.s} />
                  </p>
                  <p className="text-xs text-gray-500 leading-snug max-w-[90px] mx-auto">{st.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Over ons ── */}
      <section id="over" className="py-32 px-6" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: Y }}>Over ons</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight" style={{ color: TX }}>
              Kwaliteit en rendement gaan samen.
            </h2>
            <p className="text-[15px] leading-loose mb-6" style={{ color: SM }}>
              Opvang Kapitaal is een initiatief van een Oost-Vlaams koppel dat uit eigen overtuiging kiest voor kwaliteitsvolle kinderopvang. Met een erkenning van <strong className="text-gray-900">Opgroeien</strong> hebben we recht op structurele overheidssubsidies.
            </p>
            <div className="space-y-3">
              {['28 erkende opvangplaatsen', 'Gediplomeerd begeleidingsteam', 'Structurele overheidssubsidies', 'Transparante jaarrapportage'].map(t => (
                <div key={t} className="flex items-center gap-3 text-sm font-medium" style={{ color: TX }}>
                  <Check size={14} style={{ color: Y }} strokeWidth={3} />{t}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden">
              <Image
                src={FOTOS.over}
                alt="Begeleider met kinderen in een crèche"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Badges over foto */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white shadow-sm" style={{ color: TX }}>
                <Shield size={12} style={{ color: Y }} /> Erkend door Opgroeien
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white shadow-sm" style={{ color: TX }}>
                <Users size={12} style={{ color: Y }} /> 28 plaatsen
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-sm">
                <p className="text-xs font-semibold mb-0.5" style={{ color: TX }}>Gediplomeerd team</p>
                <p className="text-xs" style={{ color: SM }}>Warme, veilige omgeving voor elk kind van 0 tot 3 jaar.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Voordelen ── */}
      <section id="waarom" className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: Y }}>Waarom investeren</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl" style={{ color: TX }}>
              5 redenen om mee te bouwen.
            </h2>
          </Reveal>

          <div className="space-y-3">
            {[
              { n: '01', icon: Shield,    t: 'Stabiele sector',         s: 'Kinderopvang is niet conjunctuurgevoelig. Vraag groeit elk jaar, ongeacht de economie.' },
              { n: '02', icon: TrendingUp,t: 'Structureel tekort',      s: 'Gemiddeld 18+ maanden wachten in Oost-Vlaanderen. Gegarandeerde vraag van dag één.' },
              { n: '03', icon: BarChart3, t: 'Langetermijnrendement',   s: 'Doelrendement van 4 tot 9% per jaar via ouderbijdragen en overheidssubsidies.' },
              { n: '04', icon: Users,     t: 'Professioneel beheer',    s: 'U investeert. Wij zorgen voor de operatie: gediplomeerde begeleiders, transparant bestuur.' },
              { n: '05', icon: Building2, t: 'Schaalbaar model',        s: 'Het businessmodel is reproduceerbaar. Uitbreiding naar meerdere locaties behoort tot de visie.' },
            ].map(({ n, icon: Icon, t, s }, i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className="flex items-start gap-6 p-6 rounded-xl border border-gray-100 bg-white hover:border-amber-200 hover:bg-amber-50/30 transition-all group">
                  <span className="text-xs font-semibold tabular-nums mt-0.5 w-5 shrink-0" style={{ color: Y }}>{n}</span>
                  <Icon size={18} className="shrink-0 mt-0.5 transition-transform group-hover:scale-110" style={{ color: Y }} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold mb-1" style={{ color: TX }}>{t}</p>
                    <p className="text-sm" style={{ color: SM }}>{s}</p>
                  </div>
                  <ArrowRight size={15} className="shrink-0 ml-auto mt-0.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" style={{ color: Y }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fotogalerij ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: Y }}>Sfeerbeelden</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: TX }}>
              Een dag in onze crèche.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Grote foto links */}
            <Reveal className="col-span-2 row-span-2">
              <div className="relative h-64 md:h-full min-h-[260px] rounded-2xl overflow-hidden">
                <Image src={FOTOS.kind1} alt="Kinderen spelen samen" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </Reveal>
            {/* Kleine foto's rechts */}
            {[FOTOS.kind2, FOTOS.kind3, FOTOS.kind4].map((src, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative h-32 md:h-40 rounded-xl overflow-hidden">
                  <Image src={src} alt={`Sfeerbeeld kinderopvang ${i + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </Reveal>
            ))}
            {/* Tekst kaartje */}
            <Reveal delay={0.25}>
              <div className="rounded-xl p-5 flex flex-col justify-center h-32 md:h-40" style={{ background: Y }}>
                <p className="text-2xl font-bold mb-1" style={{ color: TX }}>28</p>
                <p className="text-sm font-medium" style={{ color: TX }}>gelukkige<br />kinderen / dag</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Investeringsmodel ── */}
      <section id="model" className="py-32 px-6" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: Y }}>Investeringsmodel</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight" style={{ color: TX }}>
              Zo werkt het.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: '01', t: 'Kennismakingsgesprek', s: 'U vult het formulier in. We plannen een vertrouwelijk gesprek en brengen uw situatie in kaart.' },
              { n: '02', t: 'Persoonlijk voorstel',  s: 'Op basis van uw budget en doelen stellen we een concreet voorstel op: rendement, looptijd, structuur.' },
              { n: '03', t: 'Langetermijnpartner',   s: 'Na ondertekening ontvangt u jaarlijkse rapportages en bent u mede-eigenaar van een groeiend project.' },
            ].map((stap, i) => (
              <Reveal key={stap.n} delay={i * 0.1}>
                <div className={`rounded-xl p-7 h-full border transition-all ${i === 2 ? 'border-amber-200 bg-white' : 'border-gray-100 bg-white'}`}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-sm font-bold"
                    style={{ background: Y, color: TX }}>
                    {stap.n}
                  </div>
                  <p className="font-semibold mb-3" style={{ color: TX }}>{stap.t}</p>
                  <p className="text-sm leading-relaxed" style={{ color: SM }}>{stap.s}</p>
                  {i === 2 && (
                    <a href="#contact" className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold hover:gap-3 transition-all" style={{ color: Y }}>
                      Start nu <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: Y }}>Testimonials</p>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: TX }}>Wat investeerders zeggen.</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { q: 'Een sector met structurele vraag en overheidssteun. Precies het type investering dat ik zoek: stabiel en maatschappelijk relevant.', n: 'Particuliere investeerder', r: 'Oost-Vlaanderen' },
              { q: 'De transparantie en persoonlijke aanpak gaven ons het vertrouwen om in te stappen. We worden als partner behandeld, niet als getal.', n: 'Familiale holding',          r: 'Gent' },
              { q: 'Kinderopvang is onderbedeeld in België. Dit project speelt slim in op een structureel probleem. Dat vind ik als investeerder aantrekkelijk.', n: 'Business angel', r: 'Vlaanderen' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex flex-col h-full rounded-xl border border-gray-100 p-7 bg-white hover:border-amber-200 hover:shadow-sm transition-all">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} fill={Y} style={{ color: Y }} />)}
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color: SM }}>"{t.q}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-gray-900"
                      style={{ background: Y }}>
                      {t.n[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: TX }}>{t.n}</p>
                      <p className="text-[11px]" style={{ color: SM }}>{t.r}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <Calculator />

      {/* ── CTA ── */}
      <section className="py-28 px-6 bg-gray-950">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
              Klaar om mee te investeren?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Volledig vertrouwelijk. Geen verplichtingen. Persoonlijk voorstel op maat.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#contact"
                className="flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold transition-all hover:opacity-85"
                style={{ background: Y, color: TX }}>
                Plan een gesprek <ArrowRight size={15} />
              </a>
              <a href="#calculator"
                className="flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-all">
                Bereken rendement
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Contact ── */}
      <Contact />

      {/* ── Footer ── */}
      <footer className="bg-gray-950 border-t border-gray-900 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <a href="/" className="text-base font-bold tracking-tight text-white block mb-3">
                Opvang<span style={{ color: Y }}>Kapitaal</span>
              </a>
              <p className="text-sm text-gray-500 leading-relaxed">
                Een erkende crèche voor 28 kinderen in Oost-Vlaanderen. Stabiel rendement met maatschappelijke impact.
              </p>
            </div>
            <div className="flex flex-wrap gap-16">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 mb-4">Navigatie</p>
                <div className="space-y-2.5 text-sm text-gray-400">
                  {[['#over','Over ons'],['#waarom','Voordelen'],['#model','Model'],['#calculator','Rekenmachine'],['#contact','Contact']].map(([h, l]) => (
                    <a key={h} href={h} className="block hover:text-white transition-colors">{l}</a>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 mb-4">Contact</p>
                <div className="space-y-2.5 text-sm text-gray-400">
                  <div className="flex items-center gap-2"><MapPin size={12} style={{ color: Y }} /><span>Oost-Vlaanderen</span></div>
                  <div className="flex items-center gap-2"><Mail size={12} style={{ color: Y }} /><span>info@opvangkapitaal.be</span></div>
                </div>
                <a href="#contact"
                  className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-85"
                  style={{ background: Y, color: TX }}>
                  Contact <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <p>© 2026 OpvangKapitaal</p>
            <p>Geen openbaar aanbod. Louter indicatief.</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
