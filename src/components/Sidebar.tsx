import type { Page } from "../types";
import { useGotham } from "../state/useGotham";
import { playTone } from "../utils/audio";
import "../styles/sidebar.css";

type SidebarProps = {
  activePage: Page;
  onChangePage: (page: Page) => void;
  effectsEnabled: boolean;
  onToggleEffects: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
};

export function Sidebar({
  activePage,
  onChangePage,
  effectsEnabled,
  onToggleEffects,
  soundEnabled,
  onToggleSound,
}: SidebarProps) {
  const { resetState } = useGotham();

  function changePage(page: Page) {
    playTone("click", soundEnabled);
    onChangePage(page);
  }

  return (
    <aside className="sidebar">
      <h2>GOTHAM CONTROL</h2>

      <nav>
        <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => changePage("dashboard")}
          aria-current={activePage === "dashboard" ? "page" : undefined}
        >
          Dashboard
        </button>

        <button
          className={activePage === "arkham" ? "active" : ""}
          onClick={() => changePage("arkham")}
          aria-current={activePage === "arkham" ? "page" : undefined}
        >
          Arkham
        </button>

        <button
          className={activePage === "missions" ? "active" : ""}
          onClick={() => changePage("missions")}
          aria-current={activePage === "missions" ? "page" : undefined}
        >
          Missions
        </button>

        <button
          className={activePage === "waynetech" ? "active" : ""}
          onClick={() => changePage("waynetech")}
          aria-current={activePage === "waynetech" ? "page" : undefined}
        >
          WayneTech
        </button>

        <button
          className={activePage === "terminal" ? "active" : ""}
          onClick={() => changePage("terminal")}
          aria-current={activePage === "terminal" ? "page" : undefined}
        >
          Terminal
        </button>

        <button
          className={activePage === "map" ? "active" : ""}
          onClick={() => changePage("map")}
          aria-current={activePage === "map" ? "page" : undefined}
        >
          Map
        </button>

        <button
          className={activePage === "profile" ? "active" : ""}
          onClick={() => changePage("profile")}
          aria-current={activePage === "profile" ? "page" : undefined}
        >
          Profile
        </button>

        <button
          className={activePage === "logs" ? "active" : ""}
          onClick={() => changePage("logs")}
          aria-current={activePage === "logs" ? "page" : undefined}
        >
          Logs
        </button>
      </nav>

      <button className="effects-toggle" onClick={onToggleEffects} aria-pressed={effectsEnabled}>
        Effects {effectsEnabled ? "On" : "Off"}
      </button>

      <button className="effects-toggle" onClick={onToggleSound} aria-pressed={soundEnabled}>
        Sound {soundEnabled ? "On" : "Off"}
      </button>

      <button
        className="effects-toggle danger-toggle"
        onClick={() => {
          resetState();
          playTone("alert", soundEnabled);
        }}
      >
        Reset State
      </button>

      <p className="fan-disclaimer">Fan-made project. Not official or affiliated with DC/Warner.</p>

      <small>SYSTEM ONLINE</small>
    </aside>
  );
}
