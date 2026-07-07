import { VillainCard } from "../components/VillainCard";
import { useGotham } from "../state/useGotham";

import "../styles/arkham.css";

type ArkhamProps = {
  onOpenVillain: (villainName: string) => void;
};

export function Arkham({ onOpenVillain }: ArkhamProps) {
  const { villains } = useGotham();

  return (
    <main className="arkham">
      <header className="arkham-header">
        <div>
          <h1>Arkham Database</h1>
          <p>Villain records and containment status.</p>
        </div>

        <strong>SECURITY LEVEL: OMEGA</strong>
      </header>

      <section className="villains-grid">
        {villains.map((villain) => (
          <VillainCard key={villain.id} villain={villain} onOpen={() => onOpenVillain(villain.name)} />
        ))}
      </section>
    </main>
  );
}
