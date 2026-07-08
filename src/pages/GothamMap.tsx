import { useMemo, useState } from "react";

import { LeafletGothamMap } from "../components/LeafletGothamMap";
import type { GothamDistrictMap } from "../components/LeafletGothamMap";
import { useGotham } from "../state/useGotham";
import { asset } from "../utils/assets";

import "../styles/gotham-map.css";

const districts: GothamDistrictMap[] = [
  {
    id: "arkham",
    name: "Arkham",
    aliases: ["arkham", "chemical", "ace"],
    center: [292, 292],
    pin: [286, 246],
    bounds: [[86, 72], [480, 508]],
  },
  {
    id: "old-gotham",
    name: "Old Gotham",
    aliases: ["old gotham"],
    center: [690, 292],
    pin: [678, 352],
    bounds: [[84, 445], [498, 923]],
  },
  {
    id: "financial",
    name: "Financial",
    aliases: ["financial", "wayne tower", "wayne"],
    center: [1068, 304],
    pin: [1080, 235],
    bounds: [[82, 822], [530, 1314]],
  },
  {
    id: "east-end",
    name: "East End",
    aliases: ["east end"],
    center: [366, 682],
    pin: [346, 638],
    bounds: [[490, 73], [850, 678]],
  },
  {
    id: "harbor",
    name: "Harbor",
    aliases: ["harbor", "dock", "docks", "coventry"],
    center: [950, 704],
    pin: [1008, 785],
    bounds: [[520, 596], [888, 1276]],
  },
];

function matchesDistrict(value: string, districtId: string) {
  const district = districts.find((item) => item.id === districtId);
  const normalizedValue = value.toLowerCase();

  return district?.aliases.some((alias) => normalizedValue.includes(alias)) ?? false;
}

function getDistrictForValue(value: string) {
  return districts.find((district) => matchesDistrict(value, district.id)) ?? districts[0];
}

export function GothamMap() {
  const { villains, missions } = useGotham();
  const [activeDistrictId, setActiveDistrictId] = useState("arkham");
  const activeDistrict = districts.find((district) => district.id === activeDistrictId) ?? districts[0];

  const districtVillains = useMemo(
    () => villains.filter((villain) => matchesDistrict(villain.lastLocation, activeDistrict.id)),
    [activeDistrict.id, villains]
  );
  const districtMissions = useMemo(
    () => missions.filter((mission) => matchesDistrict(mission.district, activeDistrict.id)),
    [activeDistrict.id, missions]
  );
  const activeMissionPins = useMemo(
    () => missions.filter((mission) => mission.status === "ACTIVE"),
    [missions]
  );
  const escapedVillainPins = useMemo(
    () => villains.filter((villain) => villain.status === "ESCAPED"),
    [villains]
  );

  return (
    <main className="gotham-map-page">
      <header className="map-header">
        <div>
          <h1>Gotham Map</h1>
          <p>District-level surveillance for active cases and target sightings.</p>
        </div>

        <strong>{activeDistrict.name.toUpperCase()}</strong>
      </header>

      <section className="map-layout">
        <div className="map-panel">
          <div className="map-toolbar">
            <span>WAYNETECH CARTOGRAPHY / LEAFLET GRID</span>
            <span>CUSTOM GOTHAM OVERLAY / SIGNAL MODE</span>
          </div>

          <LeafletGothamMap
            imageUrl={asset("/maps/gotham-custom-map.svg")}
            districts={districts}
            activeDistrictId={activeDistrict.id}
            activeMissionPins={activeMissionPins}
            escapedVillainPins={escapedVillainPins}
            getDistrictForValue={getDistrictForValue}
            onSelectDistrict={setActiveDistrictId}
          />

          <div className="map-location-menu" aria-label="Gotham landmark signals">
            <span>Locations</span>
            <button onClick={() => setActiveDistrictId("financial")}>Wayne Tower</button>
            <button onClick={() => setActiveDistrictId("arkham")}>Arkham Asylum</button>
            <button onClick={() => setActiveDistrictId("old-gotham")}>City Hall</button>
            <button onClick={() => setActiveDistrictId("harbor")}>Gotham Stadium</button>
          </div>

          <div className="map-legend">
            <span><i className="legend-mission" /> Active mission</span>
            <span><i className="legend-villain" /> Escaped target</span>
            <span><i className="legend-district" /> Selected district</span>
          </div>
        </div>

        <aside className="map-intel">
          <h2>District Intel</h2>

          <article>
            <span>Targets</span>
            <strong>{districtVillains.length || "NONE"}</strong>
            <p>{districtVillains.map((villain) => villain.name).join(" / ") || "No villain signal in this sector."}</p>
          </article>

          <article>
            <span>Missions</span>
            <strong>{districtMissions.length || "NONE"}</strong>
            <p>{districtMissions.map((mission) => mission.title).join(" / ") || "No active mission assigned to this district."}</p>
          </article>

          <article>
            <span>Terrain</span>
            <strong>{activeDistrict.name === "Harbor" ? "LOW" : "DENSE"}</strong>
            <p>Rain interference and rooftop density are factored into current scan reliability.</p>
          </article>
        </aside>
      </section>
    </main>
  );
}
