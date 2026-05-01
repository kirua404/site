import schoolFinaryLogo from "@/assets/school-finary-logo.png";
import eduManagerLogo from "@/assets/edumanager-logo.png";
import sfDashboard from "@/assets/screenshots/sf-dashboard.png";
import eduDashboard from "@/assets/screenshots/edu-dashboard.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-[0.04]" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-brand-green/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl animate-pulse-slow" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-green-light text-brand-green mb-6">
            Solutions numériques pour l'éducation en Afrique
          </span>
        </div>

        <h1 className="animate-fade-up-delayed text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="text-foreground">Gérez votre école</span>
          <br />
          <span className="text-gradient-hero">simplement et efficacement</span>
        </h1>

        <p className="animate-fade-up-delayed-2 mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Deux applications puissantes pour centraliser la gestion académique et financière
          de votre établissement scolaire. <strong>100% hors-ligne</strong>, adaptées au contexte africain.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="#apps"
            className="gradient-hero text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold shadow-brand hover:opacity-90 transition-all hover:scale-105"
          >
            Découvrir nos applications
          </a>
          <a
            href="#contact"
            className="border-2 border-border text-foreground px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-muted transition-all hover:scale-105"
          >
            Demander une démo
          </a>
        </div>

        {/* Floating logos + screenshot previews */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="animate-fade-up-delayed group">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-brand">
              <img src={sfDashboard} alt="SchoolFinance Manager — Tableau de bord" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-4">
                <div className="flex items-center gap-3">
                  <img src={schoolFinaryLogo} alt="SchoolFinance Manager" className="w-10 h-10 rounded-xl" />
                  <div className="text-left">
                    <p className="text-primary-foreground font-bold text-sm">SchoolFinance Manager</p>
                    <p className="text-primary-foreground/80 text-xs">Gestion financière</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-fade-up-delayed-2 group">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-brand">
              <img src={eduDashboard} alt="EduManager — Tableau de bord" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent flex items-end p-4">
                <div className="flex items-center gap-3">
                  <img src={eduManagerLogo} alt="EduManager" className="w-10 h-10 rounded-xl" />
                  <div className="text-left">
                    <p className="text-primary-foreground font-bold text-sm">EduManager</p>
                    <p className="text-primary-foreground/80 text-xs">Gestion académique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
