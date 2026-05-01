import { Quote } from "lucide-react";

const quotes = [
  "Fini les cahiers de notes perdus et les calculs de moyennes à la main",
  "Générez vos bulletins en 2 clics, conformes au modèle officiel",
  "Suivez les finances de votre école en temps réel, sans comptable",
  "Même sans électricité stable, vos données sont en sécurité",
  "L'outil que chaque directeur d'école au Congo attendait",
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ce que <span className="text-gradient-hero">disent nos utilisateurs</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div
              key={i}
              className={`bg-card rounded-2xl border border-border p-6 ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <Quote className="w-8 h-8 text-brand-gold mb-3" />
              <p className="text-card-foreground font-medium italic leading-relaxed">« {q} »</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
