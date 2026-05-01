import { Check, Star, Zap, Shield } from "lucide-react";

const plans = [
  {
    name: "Sur Mesure",
    subtitle: "EduManager pour les petites écoles",
    price: "Variable",
    period: "",
    description: "Choisissez uniquement les modules EduManager dont vous avez besoin. Le prix s'adapte à vos demandes.",
    features: [
      "EduManager — modules au choix",
      "Application de bureau installée sur votre ordinateur",
      "Installation et configuration incluses",
      "Formation de votre équipe à l'utilisation",
      "Support technique pendant 3 mois",
      "Fonctionne 100% hors-ligne",
      "Prix adapté à votre budget",
    ],
    cta: "Demander un devis",
    ctaType: "whatsapp" as const,
    icon: Zap,
    accent: "brand-green",
    gradient: "from-[hsl(var(--brand-green))] to-[hsl(var(--brand-green)/0.7)]",
    popular: false,
    formOffer: "Sur Mesure — EduManager",
    recommendedModules: [] as string[],
  },
  {
    name: "Pack Évolutif",
    subtitle: "SchoolFinance + EduManager",
    price: "450 000",
    period: "/ an (soit 50 000 FCFA / mois)",
    description: "La formule complète avec mises à jour annuelles, maintenance incluse et personnalisation à l'image de votre école.",
    features: [
      "SchoolFinance Manager — toutes les fonctionnalités",
      "EduManager — toutes les fonctionnalités",
      "Application de bureau professionnelle",
      "Mises à jour et améliorations chaque année",
      "Personnalisation aux couleurs et logo de votre école",
      "Maintenance incluse toute l'année",
      "Équipe disponible 7j/7 en cas de problème",
      "Nouvelles fonctionnalités sur demande chaque année",
      
      "Chatbot IA intégré pour interroger vos données",
      "Formation complète de votre équipe",
      "Support prioritaire par WhatsApp et téléphone",
    ],
    cta: "Choisir cette offre",
    ctaType: "form" as const,
    icon: Star,
    accent: "brand-blue",
    gradient: "from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-blue)/0.7)]",
    popular: true,
    formOffer: "Pack Évolutif — 450 000 FCFA/an",
    recommendedModules: [
      "Tableau de bord financier",
      "Gestion de la paie",
      "Suivi des paiements scolarité",
      "Chatbot IA",
      "Gestion des élèves",
      "Gestion des notes",
      "Bulletins scolaires",
      "Emploi du temps",
    ],
  },
  {
    name: "Licence Définitive",
    subtitle: "Achat unique, sans contrainte",
    price: "950 000",
    period: "FCFA — paiement unique",
    description: "L'application vous appartient. Toutes les fonctionnalités, tous les accès, sans abonnement ni dépendance.",
    features: [
      "SchoolFinance Manager + EduManager complets",
      "Application de bureau — propriété définitive",
      "Toutes les fonctionnalités déverrouillées",
      "Tous les accès administrateur",
      "Aucun abonnement — l'app est à vous pour toujours",
      "Données 100% sous votre contrôle",
      "Chatbot IA et tous les modules inclus",
      "Installation sur autant de postes que nécessaire",
      "Liberté totale d'utilisation sans restriction",
    ],
    cta: "Acquérir la licence",
    ctaType: "whatsapp" as const,
    icon: Shield,
    accent: "brand-green",
    gradient: "from-[hsl(var(--brand-green))] to-[hsl(var(--brand-blue))]",
    popular: false,
    formOffer: "Licence Définitive — 950 000 FCFA",
    recommendedModules: [
      "Tableau de bord financier",
      "Gestion de la paie",
      "Suivi des paiements scolarité",
      "Chatbot IA",
      "Rapports comptables",
      "Gestion des élèves",
      "Gestion des notes",
      "Bulletins scolaires",
      "Emploi du temps",
      "Archives & documents",
      "Cycle Primaire",
      "Cycle Secondaire",
      "Gestion des classes",
    ],
  },
];

export function PricingSection() {
  const handleChoose = (plan: typeof plans[0]) => {
    window.dispatchEvent(
      new CustomEvent("select-offer-quote", {
        detail: { offer: plan.formOffer, modules: plan.recommendedModules },
      })
    );
    window.dispatchEvent(new CustomEvent("select-offer", { detail: plan.formOffer }));
    document.getElementById("devis")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="tarifs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Tarifs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Une offre adaptée à chaque établissement
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Que vous soyez une petite école ou un grand complexe scolaire, nous avons la formule qu'il vous faut.
            Tous les prix sont en Francs CFA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-primary shadow-lg ring-2 ring-primary/20 scale-[1.02]"
                  : "border-border shadow"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  Recommandé
                </div>
              )}

              <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                  <plan.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.subtitle}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">
                    {plan.price}
                  </span>
                  {plan.price !== "Variable" && (
                    <span className="text-sm text-muted-foreground ml-1">FCFA</span>
                  )}
                </div>
                {plan.period && (
                  <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoose(plan)}
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 max-w-xl mx-auto">
          Tous nos tarifs incluent l'installation, la formation de votre équipe et le support technique.
          Contactez-nous pour un devis personnalisé adapté à votre établissement.
        </p>
      </div>
    </section>
  );
}
