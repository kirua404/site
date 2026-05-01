import { MapPin, Rocket, Users, Heart } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-gold/20 text-brand-gold mb-4">
            Made in Congo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Une solution <span className="text-gradient-hero">100% congolaise</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            CMX Technologie est une entreprise fondée par de jeunes entrepreneurs congolais
            ayant pour vision <strong>l'évolution et la digitalisation du Congo</strong>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: MapPin,
              title: "Conçu au Congo",
              desc: "Nos applications sont pensées et développées localement, adaptées aux réalités du terrain africain.",
            },
            {
              icon: Rocket,
              title: "Vision digitale",
              desc: "Nous croyons que la technologie est le levier du développement du Congo et de l'Afrique.",
            },
            {
              icon: Users,
              title: "Jeunes entrepreneurs",
              desc: "Une équipe passionnée de jeunes talents congolais déterminés à transformer l'éducation.",
            },
            {
              icon: Heart,
              title: "Impact social",
              desc: "Chaque école digitalisée contribue au progrès éducatif et économique du pays.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-brand transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="mx-auto w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-card-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-2xl border border-border p-8 text-center">
          <p className="text-lg text-card-foreground font-medium italic">
            « Notre mission : que chaque école du Congo, de Brazzaville aux zones rurales,
            puisse bénéficier d'outils numériques modernes — <span className="text-brand-green font-bold">sans internet</span>,
            <span className="text-brand-blue font-bold"> sans abonnement</span>,
            <span className="text-brand-gold font-bold"> sans limites</span>. »
          </p>
          <p className="mt-3 text-sm text-muted-foreground">— L'équipe CMX Technologie</p>
        </div>
      </div>
    </section>
  );
}
