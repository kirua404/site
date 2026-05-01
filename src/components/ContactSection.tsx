import { useState, useEffect, type FormEvent } from "react";
import { Phone, Mail, MessageCircle, Send, Loader2 } from "lucide-react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", offer: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      setForm((prev) => ({
        ...prev,
        offer: detail,
        message: `Je suis intéressé(e) par l'offre : ${detail}.\n\n`,
      }));
    };
    window.addEventListener("select-offer", handler);
    return () => window.removeEventListener("select-offer", handler);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const subject = encodeURIComponent(`[CMX Site] Message de ${form.name}${form.offer ? ` — ${form.offer}` : ""}`);
      const body = encodeURIComponent(
        `Nom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}${form.offer ? `\nOffre: ${form.offer}` : ""}\n\n${form.message}`
      );
      window.open(`mailto:cmxtechnologie@gmail.com?subject=${subject}&body=${body}`, "_self");
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "", offer: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            <span className="text-gradient-hero">Contactez-nous</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Prêt à moderniser la gestion de votre école ? Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-5">
            <h3 className="text-lg font-bold text-card-foreground">Demander une démonstration gratuite</h3>

            {form.offer && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3">
                <p className="text-sm font-medium text-primary">Offre sélectionnée : {form.offer}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">Nom complet *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Votre nom"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="+242 ..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Décrivez votre besoin..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full gradient-hero text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === "sending" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</>
              ) : (
                <><Send className="w-4 h-4" /> Envoyer le message</>
              )}
            </button>

            {status === "sent" && (
              <p className="text-sm text-brand-green text-center font-medium">Votre client mail va s'ouvrir avec le message pré-rempli</p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive text-center font-medium">Une erreur est survenue. Réessayez.</p>
            )}
          </form>

          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-lg font-bold text-card-foreground mb-4">Nos coordonnées</h3>
              <div className="space-y-4">
                <a
                  href="tel:+242055425502"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg gradient-green flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium text-card-foreground group-hover:text-brand-green transition-colors">+242 05 542 55 02</p>
                  </div>
                </a>

                <a
                  href="mailto:cmxtechnologie@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg gradient-blue flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-card-foreground group-hover:text-brand-blue transition-colors">cmxtechnologie@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/242055425502"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg gradient-green flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="font-medium text-card-foreground group-hover:text-brand-green transition-colors">Discutons maintenant</p>
                  </div>
                </a>
              </div>
            </div>

            <a
              href="https://wa.me/242055425502"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full gradient-green text-primary-foreground rounded-xl p-4 text-center hover:opacity-90 transition-opacity font-bold text-lg"
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Prendre rendez-vous sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
