import { Zap, FileText, Eye, Clock, Bot, Globe, Monitor, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Tout-en-un", desc: "Plus besoin de 5 logiciels — tout est centralisé dans une seule application de bureau professionnelle" },
  { icon: FileText, title: "Zéro papier", desc: "Reçus, bulletins, rapports de paie : tout est numérique et exportable en PDF en un clic" },
  { icon: Eye, title: "Contrôle total", desc: "Chaque franc est tracé, chaque impayé est visible en temps réel sur votre ordinateur" },
  { icon: Clock, title: "Gain de temps", desc: "Import/export Excel, génération automatique de documents en 2 clics — fini les heures de calcul manuel" },
  { icon: Bot, title: "Intelligence intégrée", desc: "Chatbot IA qui répond instantanément à toute question sur vos données financières et scolaires" },
  { icon: Globe, title: "100% congolais", desc: "Conçu au Congo, pour le Congo. FCFA, bulletins conformes, adapté aux réalités du terrain éducatif africain" },
  { icon: Monitor, title: "Application de bureau", desc: "Logiciel installé sur votre ordinateur — fonctionne 100% hors-ligne, sans dépendre d'internet" },
  { icon: ShieldCheck, title: "Données sécurisées", desc: "Vos données restent sur votre machine. Aucun serveur externe, confidentialité totale garantie" },
];

export function WhySection() {
  return (
    <section id="why" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Pourquoi <span className="text-gradient-hero">nous choisir</span> ?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Des solutions pensées pour les réalités du terrain éducatif africain
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                <r.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
