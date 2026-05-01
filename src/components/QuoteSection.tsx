import { useState, useEffect, useMemo, type FormEvent } from "react";
import {
  MessageCircle,
  FileText,
  Check,
  Mail,
  Phone,
  Building2,
  User,
  Send,
  Sparkles,
  Layers,
} from "lucide-react";

const OFFERS = [
  {
    id: "sur-mesure",
    label: "Sur Mesure — EduManager (modules au choix)",
    short: "Sur Mesure",
    price: "Tarif variable selon modules",
    accent: "from-[hsl(var(--brand-green))] to-[hsl(var(--brand-green)/0.7)]",
  },
  {
    id: "pack-evolutif",
    label: "Pack Évolutif — SchoolFinance + EduManager",
    short: "Pack Évolutif",
    price: "450 000 FCFA / an",
    accent: "from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-blue)/0.7)]",
  },
  {
    id: "licence",
    label: "Licence Définitive — Achat unique",
    short: "Licence Définitive",
    price: "950 000 FCFA — paiement unique",
    accent: "from-[hsl(var(--brand-green))] to-[hsl(var(--brand-blue))]",
  },
];

const EDU_MODULES = [
  "Gestion des élèves",
  "Gestion des notes",
  "Bulletins scolaires",
  "Emploi du temps",
  "Archives & documents",
  "Cycle Primaire",
  "Cycle Secondaire",
  "Gestion des classes",
];

const FINANCE_MODULES = [
  "Tableau de bord financier",
  "Gestion de la paie",
  "Suivi des paiements scolarité",
  "Chatbot IA",
  "Rapports comptables",
];

const CONTACTS = [
  {
    id: "commercial",
    label: "Service commercial",
    phone: "+242 05 542 55 02",
    waNumber: "242055425502",
    description: "Devis, démonstrations, abonnements",
  },
  {
    id: "support",
    label: "Support technique",
    phone: "+242 06 693 50 53",
    waNumber: "242066935053",
    description: "Installation, assistance, dépannage",
  },
];

const EMAIL = "cmxtechnologie@gmail.com";

export function QuoteSection() {
  const [form, setForm] = useState({
    school: "",
    name: "",
    phone: "",
    email: "",
    students: "",
    city: "",
    offer: OFFERS[1].id,
    modules: [] as string[],
    deadline: "",
    notes: "",
    contactId: CONTACTS[0].id,
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | string
        | { offer: string; modules?: string[] };
      const payload = typeof detail === "string" ? { offer: detail, modules: [] } : detail;
      const match = OFFERS.find((o) =>
        payload.offer?.toLowerCase().includes(o.short.toLowerCase())
      );
      if (match) {
        setForm((p) => ({
          ...p,
          offer: match.id,
          modules: payload.modules?.length ? payload.modules : p.modules,
        }));
        setTimeout(() => {
          document.getElementById("devis")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    };
    window.addEventListener("select-offer-quote", handler);
    return () => window.removeEventListener("select-offer-quote", handler);
  }, []);

  const selectedOffer = OFFERS.find((o) => o.id === form.offer)!;
  const selectedContact = CONTACTS.find((c) => c.id === form.contactId)!;
  const isCustom = form.offer === "sur-mesure";

  const toggleModule = (m: string) => {
    setForm((p) => ({
      ...p,
      modules: p.modules.includes(m) ? p.modules.filter((x) => x !== m) : [...p.modules, m],
    }));
  };

  const message = useMemo(() => {
    const lines = [
      "Bonjour CMX Technologie,",
      "",
      "Je souhaite recevoir un devis personnalisé.",
      "",
      "*Offre choisie :* " + selectedOffer.label,
      "*Tarif indicatif :* " + selectedOffer.price,
      "",
      "*Établissement :* " + (form.school || "—"),
      "*Ville :* " + (form.city || "—"),
      "*Nombre d'élèves :* " + (form.students || "—"),
      "",
      "*Contact :* " + (form.name || "—"),
      "*Téléphone :* " + (form.phone || "—"),
      form.email ? "*Email :* " + form.email : "",
    ].filter(Boolean);

    if (form.modules.length) {
      lines.push("", "*Modules sélectionnés (" + form.modules.length + ") :*");
      form.modules.forEach((m) => lines.push("• " + m));
    }
    if (form.deadline) lines.push("", "*Échéance souhaitée :* " + form.deadline);
    if (form.notes) lines.push("", "*Précisions :*", form.notes);
    lines.push("", "Merci de me recontacter pour finaliser le devis.");
    return lines.join("\n");
  }, [form, selectedOffer]);

  const handleWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(message);
    window.open(`https://wa.me/${selectedContact.waNumber}?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Demande de devis — ${selectedOffer.short}${form.school ? " — " + form.school : ""}`);
    const body = encodeURIComponent(message.replace(/\*/g, ""));
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <section id="devis" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Devis personnalisé en 2 minutes
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            <span className="text-gradient-hero">Recevez votre devis</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Choisissez votre offre, sélectionnez vos modules et envoyez votre demande directement
            par WhatsApp ou par email à notre équipe.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {/* FORM */}
          <form
            onSubmit={handleWhatsApp}
            className="lg:col-span-3 bg-card rounded-3xl border border-border p-6 sm:p-10 space-y-8 shadow-xl shadow-primary/5"
          >
            {/* Step 1 — Offer */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">1</span>
                <h3 className="text-lg font-bold text-card-foreground">Choisissez votre offre</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {OFFERS.map((o) => {
                  const active = form.offer === o.id;
                  return (
                    <button
                      type="button"
                      key={o.id}
                      onClick={() => setForm({ ...form, offer: o.id, modules: [] })}
                      className={`relative text-left p-4 rounded-xl border-2 transition-all ${
                        active
                          ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                          : "border-border hover:border-primary/40 hover:bg-muted/40"
                      }`}
                    >
                      {active && (
                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      <div className={`inline-block h-1.5 w-10 rounded-full bg-gradient-to-r ${o.accent} mb-3`} />
                      <p className="text-sm font-semibold text-card-foreground leading-tight">{o.short}</p>
                      <p className="text-xs text-muted-foreground mt-1">{o.price}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2 — Modules */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">2</span>
                <h3 className="text-lg font-bold text-card-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  {isCustom ? "Modules EduManager souhaités" : "Modules prioritaires (optionnel)"}
                </h3>
                {form.modules.length > 0 && (
                  <span className="ml-auto text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    {form.modules.length} sélectionné{form.modules.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {!isCustom && (
                <p className="text-xs text-muted-foreground mb-3">
                  Toutes les fonctionnalités sont incluses. Cochez celles qui sont prioritaires pour votre établissement.
                </p>
              )}

              {!isCustom && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">SchoolFinance</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {FINANCE_MODULES.map((m) => {
                      const active = form.modules.includes(m);
                      return (
                        <button
                          type="button"
                          key={m}
                          onClick={() => toggleModule(m)}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-sm transition-all ${
                            active
                              ? "border-primary bg-primary/5 text-card-foreground"
                              : "border-border hover:border-primary/40 text-card-foreground"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${active ? "bg-primary border-primary" : "border-muted-foreground/40"}`}>
                            {active && <Check className="w-3 h-3 text-primary-foreground" />}
                          </span>
                          <span>{m}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">EduManager</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {EDU_MODULES.map((m) => {
                    const active = form.modules.includes(m);
                    return (
                      <button
                        type="button"
                        key={m}
                        onClick={() => toggleModule(m)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-sm transition-all ${
                          active
                            ? "border-primary bg-primary/5 text-card-foreground"
                            : "border-border hover:border-primary/40 text-card-foreground"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${active ? "bg-primary border-primary" : "border-muted-foreground/40"}`}>
                          {active && <Check className="w-3 h-3 text-primary-foreground" />}
                        </span>
                        <span>{m}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Step 3 — Establishment */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">3</span>
                <h3 className="text-lg font-bold text-card-foreground">Votre établissement</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field icon={<Building2 className="w-4 h-4" />} label="Établissement *" required value={form.school} onChange={(v) => setForm({ ...form, school: v })} placeholder="Nom de l'école" />
                <Field label="Ville" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Brazzaville, Pointe-Noire..." />
                <Field icon={<User className="w-4 h-4" />} label="Votre nom *" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Nom et fonction" />
                <Field icon={<Phone className="w-4 h-4" />} label="Téléphone *" required type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+242 ..." />
                <Field icon={<Mail className="w-4 h-4" />} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="email@exemple.com" />
                <Field label="Nombre d'élèves" type="number" value={form.students} onChange={(v) => setForm({ ...form, students: v })} placeholder="Ex: 350" />
                <Field label="Échéance souhaitée" value={form.deadline} onChange={(v) => setForm({ ...form, deadline: v })} placeholder="Ex: avant la rentrée" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-card-foreground mb-1">Précisions complémentaires</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Besoins spécifiques, contraintes techniques..."
                />
              </div>
            </section>

            {/* Step 4 — Recipient */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">4</span>
                <h3 className="text-lg font-bold text-card-foreground">Destinataire WhatsApp</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {CONTACTS.map((c) => {
                  const active = form.contactId === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setForm({ ...form, contactId: c.id })}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        active ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-card-foreground">{c.label}</p>
                        {active && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-sm font-mono text-primary">{c.phone}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Submit */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full gradient-green text-primary-foreground py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                <MessageCircle className="w-5 h-5" />
                Envoyer sur WhatsApp ({selectedContact.label})
              </button>

              <button
                type="button"
                onClick={handleEmail}
                className="w-full bg-card border-2 border-primary text-primary py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Envoyer par Email à {EMAIL}
              </button>

              {sent && (
                <p className="text-sm text-center font-medium text-brand-green flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> WhatsApp s'est ouvert avec votre message pré-rempli
                </p>
              )}
            </div>
          </form>

          {/* PREVIEW */}
          <aside className="lg:col-span-2 space-y-4 lg:sticky lg:top-24 self-start">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-card-foreground">Aperçu du message</h3>
              </div>
              <div className="bg-muted/40 border border-border rounded-xl p-4 max-h-[420px] overflow-y-auto">
                <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                  {message}
                </pre>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Sera envoyé à <span className="font-semibold text-foreground">{selectedContact.phone}</span>.
                Vous pourrez modifier le message avant envoi.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
              <h4 className="font-bold text-card-foreground mb-3">Contact direct</h4>
              <div className="space-y-2 text-sm">
                <a href="tel:+242055425502" className="flex items-center gap-2 text-card-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-brand-green" />
                  +242 05 542 55 02 — Commercial
                </a>
                <a href="tel:+242066935053" className="flex items-center gap-2 text-card-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-brand-blue" />
                  +242 06 693 50 53 — Support
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-card-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  {EMAIL}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-card-foreground mb-1 flex items-center gap-1.5">
        {icon}
        {label}
      </label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder={placeholder}
      />
    </div>
  );
}