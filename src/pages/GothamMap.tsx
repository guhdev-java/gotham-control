import { useState } from "react";

import { useGotham } from "../state/useGotham";

import "../styles/gotham-map.css";

const districts = [
  {
    id: "arkham",
    name: "Arkham",
    aliases: ["arkham", "chemical", "ace"],
    path: "M72 74 L205 48 L284 116 L256 238 L134 252 L54 170 Z",
    label: { x: 166, y: 152 },
    pin: { x: 178, y: 132 },
  },
  {
    id: "old-gotham",
    name: "Old Gotham",
    aliases: ["old gotham"],
    path: "M300 82 L438 62 L500 142 L454 264 L316 246 L254 150 Z",
    label: { x: 378, y: 158 },
    pin: { x: 392, y: 132 },
  },
  {
    id: "financial",
    name: "Financial",
    aliases: ["financial", "wayne tower", "wayne"],
    path: "M500 104 L632 78 L682 180 L626 292 L492 258 L454 156 Z",
    label: { x: 584, y: 178 },
    pin: { x: 576, y: 146 },
  },
  {
    id: "east-end",
    name: "East End",
    aliases: ["east end"],
    path: "M128 274 L278 258 L346 350 L278 426 L114 398 L54 318 Z",
    label: { x: 206, y: 342 },
    pin: { x: 218, y: 316 },
  },
  {
    id: "harbor",
    name: "Harbor",
    aliases: ["harbor", "dock", "docks", "coventry"],
    path: "M370 286 L526 274 L658 324 L628 424 L430 430 L316 366 Z",
    label: { x: 500, y: 354 },
    pin: { x: 492, y: 330 },
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

  const districtVillains = villains.filter((villain) => matchesDistrict(villain.lastLocation, activeDistrict.id));
  const districtMissions = missions.filter((mission) => matchesDistrict(mission.district, activeDistrict.id));
  const activeMissionPins = missions.filter((mission) => mission.status === "ACTIVE");
  const escapedVillainPins = villains.filter((villain) => villain.status === "ESCAPED");

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
            <span>WAYNETECH CARTOGRAPHY / RAIN MODE</span>
            <span>GRID 44.7N / 73.9W</span>
          </div>

          <svg viewBox="0 0 720 460" role="img" aria-label="Interactive Gotham district map">
            <defs>
              <pattern id="city-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M28 0H0v28" />
              </pattern>
              <filter id="soft-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect className="map-base" width="720" height="460" />
            <rect className="map-grid" width="720" height="460" fill="url(#city-grid)" />
            <path className="map-water" d="M0 334 C92 302 166 334 248 316 C352 294 438 246 536 276 C612 300 666 272 720 244 L720 460 L0 460 Z" />
            <path className="map-shore" d="M0 334 C92 302 166 334 248 316 C352 294 438 246 536 276 C612 300 666 272 720 244" />
            <path className="map-bridge" d="M264 260 C330 286 360 318 392 365" />
            <path className="map-bridge" d="M468 264 C520 292 558 312 626 324" />
            <path className="map-road" d="M128 168 C230 126 330 152 440 132 C540 114 606 138 676 184" />
            <path className="map-road" d="M106 318 C214 298 310 326 412 302 C504 280 588 298 658 338" />
            <path className="map-road" d="M344 78 C326 156 330 244 376 366" />

            {districts.map((district) => (
              <g
                key={district.id}
                className="map-district-button"
                onClick={() => setActiveDistrictId(district.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveDistrictId(district.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <path className={activeDistrict.id === district.id ? "district active" : "district"} d={district.path} />
                <text x={district.label.x} y={district.label.y} textAnchor="middle">
                  {district.name}
                </text>
              </g>
            ))}

            {activeMissionPins.map((mission, index) => {
              const district = getDistrictForValue(mission.district);
              return (
                <g key={mission.id} className="map-pin-group" transform={`translate(${district.pin.x + index * 8} ${district.pin.y + index * 8})`}>
                  <circle className="mission-pin ping" r="15" />
                  <circle className="mission-pin" r="6" />
                </g>
              );
            })}

            {escapedVillainPins.map((villain, index) => {
              const district = getDistrictForValue(villain.lastLocation);
              return (
                <g key={villain.id} className="map-pin-group" transform={`translate(${district.pin.x - 10 + index * 12} ${district.pin.y + 34 + index * 6})`}>
                  <circle className="villain-pin ping" r="16" />
                  <circle className="villain-pin" r="7" />
                </g>
              );
            })}

            <g className="map-compass" transform="translate(648 66)">
              <circle r="32" />
              <path d="M0-21 L7 8 L0 3 L-7 8 Z" />
              <text y="48" textAnchor="middle">N</text>
            </g>
          </svg>

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
