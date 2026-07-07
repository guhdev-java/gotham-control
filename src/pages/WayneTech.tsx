import { GadgetCard } from "../components/GadgetCard";
import { useGotham } from "../state/useGotham";

import "../styles/waynetech.css";

export function WayneTech() {
  const { gadgets } = useGotham();

  return (
    <main className="waynetech">
      <header className="waynetech-header">
        <div>
          <h1>WayneTech Arsenal</h1>
          <p>Equipment, vehicles and tactical systems.</p>
        </div>

        <strong>LAB STATUS: ACTIVE</strong>
      </header>

      <section className="gadgets-grid">
        {gadgets.map((gadget) => (
          <GadgetCard key={gadget.id} gadget={gadget} />
        ))}
      </section>
    </main>
  );
}
