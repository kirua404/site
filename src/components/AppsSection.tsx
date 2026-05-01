import { DollarSign, GraduationCap, WifiOff, Shield, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import schoolFinaryLogo from "@/assets/school-finary-logo.png";
import eduManagerLogo from "@/assets/edumanager-logo.png";

import sfDashboard from "@/assets/screenshots/sf-dashboard.png";
import sfPayments from "@/assets/screenshots/sf-payments.png";
import sfImpayes from "@/assets/screenshots/sf-impayes.png";

import eduDashboard from "@/assets/screenshots/edu-dashboard.png";
import eduDashboard2 from "@/assets/screenshots/edu-dashboard2.png";
import eduNotes from "@/assets/screenshots/edu-notes.png";
import eduBulletin from "@/assets/screenshots/edu-bulletin.png";
import eduCalendar from "@/assets/screenshots/edu-calendar.png";
import eduStats from "@/assets/screenshots/edu-stats.png";
import eduAudit from "@/assets/screenshots/edu-audit.png";

const apps = [
  {
    name: "SchoolFinance Manager",
    tagline: "Gestion financière scolaire complète",
    logo: schoolFinaryLogo,
    gradient: "gradient-green",
    lightBg: "bg-brand-green-light",
    textColor: "text-brand-green",
    borderColor: "border-brand-green",
    features: [
      "Tableau de bord financier intelligent avec KPIs en temps réel",
      "Paiements centralisés : scolarité, cantine, transport",
      "Reçus professionnels générés automatiquement",
      "Suivi des impayés avec alertes automatiques",
      "Paie du personnel (salaire fixe ou horaire)",
      "Gestion avancée des heures et validation",
      "Statistiques et rapports financiers exportables",
      "Chatbot intelligent intégré",
    ],
    screenshots: [
      { src: sfDashboard, label: "Tableau de bord" },
      { src: sfPayments, label: "Paiements" },
      { src: sfImpayes, label: "Impayés" },
    ],
    persuasion: [
      "Chaque franc CFA est tracé — zéro fuite financière",
      "Fini les calculs de paie manuels et les erreurs",
      "Reçus et rapports générés en 1 clic",
      "Contrôle total sur les finances de votre école",
    ],
    icon: DollarSign,
  },
  {
    name: "EduManager",
    tagline: "Gestion académique tout-en-un — Plus de 1 000 élèves gérés sans effort",
    logo: eduManagerLogo,
    gradient: "gradient-blue",
    lightBg: "bg-brand-blue-light",
    textColor: "text-brand-blue",
    borderColor: "border-brand-blue",
    features: [
      "Gestion de +1 000 élèves avec fiches médicales complètes",
      "Notes par trimestre avec moyennes pondérées automatiques",
      "Bulletins scolaires conformes au système congolais",
      "Module Primaire (CP1→CM2) et Secondaire (6ème→Terminale)",
      "Calendrier professionnel avec événements récurrents",
      "Statistiques de performance par classe",
      "Archives académiques consultables sur plusieurs années",
      "Assistant intelligent 100% hors-ligne",
    ],
    screenshots: [
      { src: eduDashboard, label: "Tableau de bord" },
      { src: eduDashboard2, label: "Vue d'ensemble" },
      { src: eduNotes, label: "Notes" },
      { src: eduBulletin, label: "Bulletins" },
      { src: eduCalendar, label: "Calendrier" },
      { src: eduStats, label: "Statistiques" },
      { src: eduAudit, label: "Audit" },
    ],
    persuasion: [
      "Bulletins conformes au modèle officiel congolais",
      "Capacité éprouvée : plus de 1 000 élèves par établissement",
      "Moyennes, classements et admissions calculés automatiquement",
      "Fonctionne intégralement sans connexion internet",
    ],
    icon: GraduationCap,
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function ScreenshotCarousel({ screenshots }: { screenshots: { src: string; label: string }[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % screenshots.length), 4000);
    return () => clearInterval(timer);
  }, [screenshots.length]);

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-xl border border-border shadow-brand">
        <img
          src={screenshots[current].src}
          alt={screenshots[current].label}
          className="w-full h-auto object-cover transition-opacity duration-500"
        />
      </div>
      <button
        onClick={() => setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1))}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur p-1.5 rounded-full border border-border opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4 text-foreground" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % screenshots.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur p-1.5 rounded-full border border-border opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4 text-foreground" />
      </button>
      <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
        {screenshots.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`text-xs px-2.5 py-1 rounded-full transition-all ${i === current ? "bg-primary text-primary-foreground scale-105" : "bg-muted text-muted-foreground hover:bg-accent"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function AppsSection() {
  return (
    <section id="apps" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Nos <span className="text-gradient-hero">Applications</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Deux solutions complémentaires pour couvrir tous les besoins de votre établissement
          </p>

          {/* Animated stats bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: 1000, suffix: "+", label: "Élèves gérés" },
              { value: 100, suffix: "%", label: "Hors-ligne" },
              { value: 2, suffix: "", label: "Apps intégrées" },
              { value: 0, suffix: "", label: "Abonnement", display: "0 FCFA" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center">
                <p className="text-2xl font-extrabold text-gradient-hero">
                  {s.display ? s.display : <AnimatedCounter target={s.value} suffix={s.suffix} />}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-24">
          {apps.map((app, idx) => {
            const ref = useRef<HTMLDivElement>(null);
            const visible = useInView(ref);
            return (
              <div
                key={app.name}
                ref={ref}
                className={`space-y-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                {/* Header */}
                <div className="flex items-center gap-4">
                  <img src={app.logo} alt={app.name} className="w-14 h-14 rounded-2xl shadow-brand" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{app.name}</h3>
                    <p className="text-muted-foreground">{app.tagline}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Screenshots */}
                  <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                    <ScreenshotCarousel screenshots={app.screenshots} />
                  </div>

                  {/* Features + Persuasion */}
                  <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Fonctionnalités clés</h4>
                      <ul className="space-y-2.5">
                        {app.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-card-foreground">
                            <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full ${app.lightBg} ${app.textColor} flex items-center justify-center text-xs font-bold`}>✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Persuasion */}
                    <div className={`mt-4 rounded-2xl border-2 ${app.borderColor} bg-card p-5`}>
                      <h4 className={`text-sm font-bold ${app.textColor} mb-3`}>Pourquoi {app.name} ?</h4>
                      <ul className="space-y-2">
                        {app.persuasion.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-card-foreground">
                            <span className={`${app.textColor} font-bold`}>—</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#contact"
                      className={`mt-4 inline-block ${app.gradient} text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all hover:scale-105`}
                    >
                      Demander une démo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shared benefits */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { icon: WifiOff, label: "100% Hors-ligne" },
            { icon: Shield, label: "Sécurisé (RBAC)" },
            { icon: Smartphone, label: "Responsive" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-3 bg-card rounded-xl border border-border p-4 hover:shadow-brand transition-all duration-300">
              <b.icon className="w-5 h-5 text-brand-green flex-shrink-0" />
              <span className="text-sm font-medium text-card-foreground">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
