import { useState } from "react";
import { Star, Send, User } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    name: "Directrice — École Joseph Nkaba Itou",
    rating: 5,
    comment: "Depuis que nous utilisons SchoolFinance Manager, la gestion des frais de scolarité est devenue transparente et sans erreur. Les reçus automatiques ont changé notre quotidien. Une solution faite pour nos réalités.",
    date: "Mars 2026",
  },
  {
    name: "Directeur des Études — Complexe Scolaire Lygade",
    rating: 5,
    comment: "EduManager nous permet de gérer plus de 800 élèves sans stress. Les bulletins sont générés en quelques clics et conformes au système congolais. L'équipe CMX est toujours disponible.",
    date: "Février 2026",
  },
  {
    name: "Directeur — Complexe Scolaire La Réussite",
    rating: 5,
    comment: "Le Pack Évolutif nous a permis de digitaliser entièrement notre école. Chaque année, CMX Technologie apporte de nouvelles améliorations. C'est un vrai partenariat de confiance.",
    date: "Janvier 2026",
  },
];

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;

    const newReview: Review = {
      name: form.name,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    };
    setReviews((prev) => [newReview, ...prev]);
    setForm({ name: "", rating: 5, comment: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="avis" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Avis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ce que <span className="text-gradient-hero">disent nos utilisateurs</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Découvrez les retours de directeurs et enseignants qui utilisent nos solutions au quotidien.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border p-6 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s < review.rating ? "text-brand-gold fill-brand-gold" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="text-card-foreground font-medium leading-relaxed flex-1 mb-4">
                « {review.comment} »
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8">
            <h3 className="text-lg font-bold text-card-foreground mb-6">Laisser un avis</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  Votre nom / établissement *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ex: Directeur — École ABC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Note *</label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, rating: s + 1 })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          s < form.rating ? "text-brand-gold fill-brand-gold" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Votre avis *</label>
                <textarea
                  required
                  rows={3}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Partagez votre expérience avec nos applications..."
                />
              </div>

              <button
                type="submit"
                className="gradient-hero text-primary-foreground py-3 px-6 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" /> Publier mon avis
              </button>

              {submitted && (
                <p className="text-sm text-brand-green font-medium">Merci pour votre avis !</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
