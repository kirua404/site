export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="font-semibold text-foreground">CMX Technologie</span>. Tous droits réservés.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Solutions numériques pour l'éducation en Afrique
        </p>
      </div>
    </footer>
  );
}
