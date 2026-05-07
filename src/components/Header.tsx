declare global {
  interface Window {
    __NEXT_PUBLIC_VERSION?: string;
  }
}

interface HeaderProps {
  installable: boolean;
  installed: boolean;
  installer: () => Promise<void>;
}

export default function Header({
  installable,
  installed,
  installer,
}: HeaderProps) {
  const version = process.env.NEXT_PUBLIC_VERSION || "0.0.125";

  return (
    <>
      {!installed && installable && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-green-800">
              Installer Arbodex sur votre appareil
            </h3>
            <p className="text-sm text-green-700">
              Accédez à Arbodex hors connexion, directement depuis votre écran
              d&apos;accueil.
            </p>
          </div>
          <button
            onClick={installer}
            className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 whitespace-nowrap"
          >
            Installer
          </button>
        </div>
      )}

      {!installed && !installable && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-800 text-sm">
            Installer Arbodex comme application
          </h3>
          <div className="mt-2 text-sm text-amber-700 space-y-1">
            <p>
              <strong>Chrome / Edge :</strong> Cliquez sur l&apos;icône{" "}
              <span className="font-mono">⊕</span> dans la barre d&apos;adresse,
              ou Menu → Installer Arbodex.
            </p>
            <p>
              <strong>Safari (iPhone) :</strong> Appuyez sur{" "}
              <span className="font-mono">⎋</span> (Partager) → Sur l&apos;écran
              d&apos;accueil.
            </p>
            <p>
              <strong>Android :</strong> Menu (
              <span className="font-mono">⋮</span>) → Installer
              l&apos;application.
            </p>
          </div>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800">
          Arbodex
        </h1>
        <p className="text-gray-500 mt-1">
          137 essences pour les paysagistes — Hauts-de-France & Benelux (v
          {version})
        </p>
      </header>
    </>
  );
}
