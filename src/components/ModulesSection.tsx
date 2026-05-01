import { useState, useRef, useEffect, useCallback } from "react";
import {
  BarChart3, CreditCard, AlertTriangle, Users, BookOpen, FileText,
  Calendar, TrendingUp, ClipboardList, ChevronRight, Bot, Clock, UserCheck,
  X, ZoomIn, ChevronLeft
} from "lucide-react";

import schoolFinaryLogo from "@/assets/school-finary-logo.png";
import eduManagerLogo from "@/assets/edumanager-logo.png";

import sfDashboard from "@/assets/screenshots/sf-dashboard.png";
import sfPayments from "@/assets/screenshots/sf-payments.png";
import sfImpayes from "@/assets/screenshots/sf-impayes.png";
import sfEleves from "@/assets/screenshots/sf-eleves.jpg";
import sfPersonnel from "@/assets/screenshots/sf-personnel.jpg";
import sfHeures from "@/assets/screenshots/sf-heures.jpg";
import sfStats from "@/assets/screenshots/sf-stats.jpg";
import sfCalendrier from "@/assets/screenshots/sf-calendrier.jpg";

import eduDashboard from "@/assets/screenshots/edu-dashboard.png";
import eduDashboard2 from "@/assets/screenshots/edu-dashboard2.png";
import eduNotes from "@/assets/screenshots/edu-notes.png";
import eduBulletin from "@/assets/screenshots/edu-bulletin.png";
import eduCalendar from "@/assets/screenshots/edu-calendar.png";
import eduStats from "@/assets/screenshots/edu-stats.png";
import eduAudit from "@/assets/screenshots/edu-audit.png";
import eduEleves from "@/assets/screenshots/edu-eleves.jpg";
import eduClasses from "@/assets/screenshots/edu-classes.jpg";
import eduFinances from "@/assets/screenshots/edu-finances.jpg";
import eduPaie from "@/assets/screenshots/edu-paie.jpg";
import eduEmploi from "@/assets/screenshots/edu-emploi.jpg";
import eduPrimaire from "@/assets/screenshots/edu-primaire.jpg";
import eduArchives from "@/assets/screenshots/edu-archives.jpg";
import eduNotes2 from "@/assets/screenshots/edu-notes2.jpg";

const sfModules = [
  {
    icon: BarChart3,
    title: "Tableau de bord intelligent",
    desc: "KPIs en temps réel : élèves actifs, personnel, recettes, dépenses, solde net, impayés, heures validées et salaires. Graphiques dynamiques avec tendance mensuelle et recettes par classe.",
    screenshot: sfDashboard,
  },
  {
    icon: UserCheck,
    title: "Gestion des élèves",
    desc: "Inscription complète avec nom, classe, genre, parent, téléphone et suivi médical. Import/export Excel, recherche avancée, archivage par année scolaire.",
    screenshot: sfEleves,
  },
  {
    icon: CreditCard,
    title: "Paiements centralisés",
    desc: "Scolarité, cantine, transport, salaires — tout au même endroit. Reçus professionnels personnalisables, numérotés et imprimables générés automatiquement.",
    screenshot: sfPayments,
  },
  {
    icon: AlertTriangle,
    title: "Suivi des impayés",
    desc: "Alertes automatiques en temps réel, relances ciblées, historique complet par élève. Plus aucun impayé ne passe inaperçu.",
    screenshot: sfImpayes,
  },
  {
    icon: Users,
    title: "Personnel & Rémunération",
    desc: "Gestion complète du personnel : enseignants, secrétaires, comptables. Type de salaire horaire ou mensuel, import/export, fiches détaillées.",
    screenshot: sfPersonnel,
  },
  {
    icon: Clock,
    title: "Heures & Salaires",
    desc: "Suivi du volume horaire avec validation obligatoire avant paiement. Salaire fixe ou horaire modulable, primes & bonus (13ème mois, performance), bulletins de paie détaillés.",
    screenshot: sfHeures,
  },
  {
    icon: TrendingUp,
    title: "Statistiques & Rapports",
    desc: "Évolution des recettes mensuelles, recettes par méthode (Espèces, Virement, Mobile Money), élèves par classe, salaires & primes du personnel. Rapports financiers complets.",
    screenshot: sfStats,
  },
  {
    icon: Calendar,
    title: "Calendrier & Rendez-vous",
    desc: "Planification mensuelle interactive. Rendez-vous parents, réunions, examens. Notifications et rappels automatiques.",
    screenshot: sfCalendrier,
  },
  {
    icon: Bot,
    title: "Chatbot IA intégré",
    desc: "Posez n'importe quelle question sur vos données : « Combien d'impayés ce mois ? », « Quel est le total des recettes ? » — réponse instantanée grâce à l'IA.",
    screenshot: sfDashboard,
  },
];

const eduModules = [
  {
    icon: BarChart3,
    title: "Tableau de bord",
    desc: "Vue d'ensemble complète : élèves inscrits, classes actives, moyenne générale, taux de réussite, matières enseignées. Filtrage par cycle (Collège, Lycée, Lycée d'Excellence). Accès rapide à tous les modules.",
    screenshot: eduDashboard,
  },
  {
    icon: Users,
    title: "Gestion des élèves (+1 000)",
    desc: "Registre complet de tous les élèves (340+). Recherche instantanée par nom, filtrage par classe et cycle. Fiche détaillée avec photo, informations personnelles, contact parent, historique scolaire.",
    screenshot: eduEleves,
  },
  {
    icon: BookOpen,
    title: "Classes & Matières",
    desc: "Gestion des 17 classes actives avec cartes visuelles. Attribution des enseignants par matière avec coefficients personnalisables. Onglets Classes, Matières et Attribution.",
    screenshot: eduClasses,
  },
  {
    icon: ClipboardList,
    title: "Gestion des notes",
    desc: "Saisie par classe avec filtrage par cycle, classe, matière et trimestre. 5 sous-modules : Saisie, Répertoire, Relevé par élève, Relevé par classe, Admis/Échoués. Moyennes pondérées selon le système congolais.",
    screenshot: eduNotes2,
  },
  {
    icon: CreditCard,
    title: "Gestion financière",
    desc: "Suivi complet des finances par classe et par année. Total entrées/sorties, solde net, nombre de transactions. Configuration des frais mensuels, suivi des impayés, export PDF des reçus professionnels.",
    screenshot: eduFinances,
  },
  {
    icon: UserCheck,
    title: "Paie du personnel",
    desc: "Gestion des salaires enseignants et personnel administratif. Vue d'ensemble avec totaux par catégorie. Système dual : horaire pour les enseignants, fixe pour le personnel. Fiches de paie mensuelles.",
    screenshot: eduPaie,
  },
  {
    icon: Calendar,
    title: "Emploi du temps",
    desc: "Planification des cours par classe avec grille horaire visuelle. Attribution des matières et enseignants par créneau. Impression possible pour affichage en classe.",
    screenshot: eduEmploi,
  },
  {
    icon: FileText,
    title: "Bulletins scolaires",
    desc: "Génération automatique de bulletins professionnels A4. Format trimestriel (secondaire) et mensuel (primaire). Configurable : logo, en-tête, signatures, appréciations. Conforme au système éducatif congolais.",
    screenshot: eduBulletin,
  },
  {
    icon: BookOpen,
    title: "École Primaire (CP1–CM2)",
    desc: "Module dédié au primaire congolais. Notes sur 10, 17 matières, 6 classes. 7 sous-modules : Tableau de bord, Classes, Élèves, Notes, Résultats, Bulletins et Gestion. Moyennes pondérées et classement mensuel.",
    screenshot: eduPrimaire,
  },
  {
    icon: TrendingUp,
    title: "Statistiques & Analyses",
    desc: "Moyenne générale, taux de réussite, meilleure matière, top performers. Filtrage par cycle, classe et trimestre. Comparaison inter-classes avec graphiques interactifs.",
    screenshot: eduStats,
  },
  {
    icon: Calendar,
    title: "Calendrier professionnel",
    desc: "Calendrier mensuel et hebdomadaire. Création d'événements avec récurrence (quotidienne, hebdomadaire, mensuelle). Notes du jour, rappels automatiques et synchronisation avec les notifications.",
    screenshot: eduCalendar,
  },
  {
    icon: Clock,
    title: "Bibliothèque d'archives",
    desc: "Archivage complet des données de fin d'année scolaire. Consultation et réimpression des bulletins depuis les archives. Accès aux relevés, données financières et listes d'élèves des années passées.",
    screenshot: eduArchives,
  },
  {
    icon: Bot,
    title: "Assistant IA (ChatBot)",
    desc: "Chatbot contextuel hors-ligne intégré. Répond aux questions sur les élèves, notes, finances. Suggestions intelligentes pour naviguer dans l'app. Aide sans formation préalable.",
    screenshot: eduDashboard2,
  },
];

function ModuleCard({
  mod,
  isActive,
  onClick,
  accentClass,
}: {
  mod: (typeof sfModules)[0];
  isActive: boolean;
  onClick: () => void;
  accentClass: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
        isActive
          ? `border-2 ${accentClass} bg-card shadow-brand scale-[1.02]`
          : "border-border bg-card/60 hover:bg-card hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isActive ? "gradient-hero" : "bg-muted"
          }`}
        >
          <mod.icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
        </div>
        <div className="min-w-0">
          <p className={`font-semibold text-sm ${isActive ? "text-card-foreground" : "text-muted-foreground"}`}>
            {mod.title}
          </p>
        </div>
        <ChevronRight className={`w-4 h-4 ml-auto flex-shrink-0 transition-transform ${isActive ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
      </div>
      {isActive && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>}
    </button>
  );
}

function Lightbox({
  modules,
  index,
  onClose,
  onNav,
}: {
  modules: typeof sfModules;
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % modules.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + modules.length) % modules.length);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [index, modules.length, onClose, onNav]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative max-w-6xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="relative rounded-2xl overflow-hidden bg-card shadow-2xl">
          <img
            src={modules[index].screenshot}
            alt={modules[index].title}
            className="w-full h-auto max-h-[80vh] object-contain bg-black"
          />
          <div className="px-6 py-4 border-t border-border">
            <p className="text-lg font-semibold text-card-foreground">{modules[index].title}</p>
            <p className="text-sm text-muted-foreground mt-1">{modules[index].desc}</p>
            <p className="text-xs text-muted-foreground mt-2">{index + 1} / {modules.length}</p>
          </div>
        </div>
        <button
          onClick={() => onNav((index - 1 + modules.length) % modules.length)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white/70 hover:text-white transition-colors hidden lg:block"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>
        <button
          onClick={() => onNav((index + 1) % modules.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white/70 hover:text-white transition-colors hidden lg:block"
        >
          <ChevronRight className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}

function AppModules({
  appName,
  logo,
  modules,
  gradientClass,
  accentBorderClass,
}: {
  appName: string;
  logo: string;
  modules: typeof sfModules;
  gradientClass: string;
  accentBorderClass: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleNav = useCallback((i: number) => setLightbox(i), []);
  const handleClose = useCallback(() => setLightbox(null), []);

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      {/* App header */}
      <div className="flex items-center gap-4 mb-8">
        <img src={logo} alt={appName} className="w-12 h-12 rounded-2xl shadow-brand" />
        <h3 className="text-2xl font-bold text-foreground">{appName}</h3>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Module list */}
        <div className="lg:col-span-2 space-y-2">
          {modules.map((mod, i) => (
            <ModuleCard
              key={mod.title}
              mod={mod}
              isActive={i === active}
              onClick={() => setActive(i)}
              accentClass={accentBorderClass}
            />
          ))}
        </div>

        {/* Screenshot */}
        <div className="lg:col-span-3 flex items-start">
          <div className="w-full rounded-2xl border border-border shadow-brand overflow-hidden bg-card group">
            <div className={`h-1.5 ${gradientClass}`} />
            <div className="relative cursor-pointer" onClick={() => setLightbox(active)}>
              <img
                src={modules[active].screenshot}
                alt={modules[active].title}
                className="w-full h-auto transition-all duration-500 group-hover:brightness-90"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-border">
              <p className="text-sm font-medium text-card-foreground">{modules[active].title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{modules[active].desc}</p>
            </div>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox modules={modules} index={lightbox} onClose={handleClose} onNav={handleNav} />
      )}
    </div>
  );
}

export function ModulesSection() {
  return (
    <section id="modules" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Modules <span className="text-gradient-hero">en détail</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez chaque fonctionnalité de nos applications, module par module
          </p>
        </div>

        <div className="space-y-24">
          <AppModules
            appName="SchoolFinance Manager"
            logo={schoolFinaryLogo}
            modules={sfModules}
            gradientClass="gradient-green"
            accentBorderClass="border-brand-green"
          />

          <div className="border-t border-border" />

          <AppModules
            appName="EduManager"
            logo={eduManagerLogo}
            modules={eduModules}
            gradientClass="gradient-blue"
            accentBorderClass="border-brand-blue"
          />
        </div>
      </div>
    </section>
  );
}
