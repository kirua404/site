import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "SchoolFinance Manager et EduManager fonctionnent-ils sans Internet ?",
    a: "Oui, les deux applications sont 100 % hors-ligne. Toutes vos données restent stockées localement sur votre ordinateur, sans aucune connexion Internet requise.",
  },
  {
    q: "Sur quels appareils puis-je utiliser les applications ?",
    a: "Nos applications sont des logiciels de bureau conçus pour les ordinateurs sous Windows. Aucune installation serveur n'est nécessaire : il suffit de les installer sur votre PC.",
  },
  {
    q: "Quelle est la différence entre le Pack Sur Mesure et le Pack Évolutif ?",
    a: "Le Pack Sur Mesure inclut uniquement EduManager (gestion des notes et bulletins). Le Pack Évolutif comprend les deux applications — SchoolFinance Manager + EduManager — avec un an de mises à jour et support technique.",
  },
  {
    q: "Puis-je importer mes données existantes (élèves, personnel) ?",
    a: "Oui ! SchoolFinance Manager et EduManager supportent l'import et l'export de données via des fichiers Excel, ce qui facilite la migration depuis vos anciens systèmes.",
  },
  {
    q: "Le paiement est-il unique ou par abonnement ?",
    a: "Les formules Sur Mesure et Licence Définitive sont des paiements uniques, sans abonnement. Le Pack Évolutif inclut un an de mises à jour ; au-delà, le renouvellement est optionnel.",
  },
  {
    q: "Comment fonctionne le chatbot IA intégré ?",
    a: "Le chatbot IA de SchoolFinance Manager répond instantanément à vos questions sur les données financières de l'école : soldes, impayés, statistiques… Tout cela directement depuis l'application, sans Internet.",
  },
  {
    q: "Proposez-vous une formation ou une assistance à l'installation ?",
    a: "Oui, nous offrons une assistance à l'installation et une prise en main personnalisée. Contactez-nous via WhatsApp au +242 05 542 55 02 pour planifier un rendez-vous.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Absolument. Vos données restent sur votre ordinateur et ne sont jamais envoyées sur Internet. De plus, l'application permet de faire des sauvegardes régulières pour éviter toute perte.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Retrouvez les réponses aux questions les plus posées sur nos applications et nos offres.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-[15px]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
