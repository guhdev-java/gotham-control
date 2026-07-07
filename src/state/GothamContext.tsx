import { useEffect, useReducer } from "react";
import type { ReactNode } from "react";

import { gadgets as initialGadgets } from "../data/gadgets";
import { missions as initialMissions } from "../data/missions";
import { villains as initialVillains } from "../data/villains";
import type { EventLog } from "../types";
import { GothamContext } from "./gothamContext";
import type { GothamAction, GothamState } from "./gothamContext";

const STORAGE_KEY = "gotham-control-state";

const initialState: GothamState = {
  villains: initialVillains,
  missions: initialMissions,
  gadgets: initialGadgets,
  logs: [
    {
      id: 1,
      timestamp: "SYSTEM BOOT",
      type: "SYSTEM",
      message: "Gotham Control Center initialized.",
    },
  ],
};

function createLog(type: EventLog["type"], message: string, timestamp: string): EventLog {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    timestamp,
    type,
    message,
  };
}

function loadState(): GothamState {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return initialState;
  }

  try {
    return JSON.parse(savedState) as GothamState;
  } catch {
    return initialState;
  }
}

function gothamReducer(state: GothamState, action: GothamAction): GothamState {
  switch (action.type) {
    case "CAPTURE_VILLAIN": {
      const villain = state.villains.find((item) => item.id === action.villainId);

      if (!villain || villain.status === "CAPTURED") {
        return state;
      }

      return {
        ...state,
        villains: state.villains.map((item) =>
          item.id === action.villainId ? { ...item, status: "CAPTURED" } : item
        ),
        logs: [
          createLog("CAPTURE", `${villain.name} captured near ${villain.lastLocation}.`, action.timestamp),
          ...state.logs,
        ],
      };
    }

    case "DEPLOY_GADGET": {
      const gadget = state.gadgets.find((item) => item.id === action.gadgetId);

      if (!gadget || gadget.status === "MAINTENANCE") {
        return state;
      }

      const nextPowerLevel = Math.max(gadget.powerLevel - 18, 0);
      const nextStatus = nextPowerLevel === 0 ? "MAINTENANCE" : "DEPLOYED";

      return {
        ...state,
        gadgets: state.gadgets.map((item) =>
          item.id === action.gadgetId
            ? {
                ...item,
                powerLevel: nextPowerLevel,
                status: nextStatus,
                lastMaintenance: nextPowerLevel === 0 ? `${action.timestamp} / Auto-maintenance queued` : item.lastMaintenance,
                deploymentHistory: `Deployment authorized at ${action.timestamp}.`,
              }
            : item
        ),
        logs: [
          createLog("DEPLOY", `${gadget.name} deployed. Power level now ${nextPowerLevel}%.`, action.timestamp),
          ...state.logs,
        ],
      };
    }

    case "RESOLVE_MISSION": {
      const mission = state.missions.find((item) => item.id === action.missionId);

      if (!mission || mission.status === "COMPLETED") {
        return state;
      }

      return {
        ...state,
        missions: state.missions.map((item) =>
          item.id === action.missionId
            ? { ...item, status: "COMPLETED", progress: 100, riskLevel: 0, eta: "COMPLETE" }
            : item
        ),
        logs: [
          createLog("MISSION", `${mission.title} resolved by ${mission.assignedUnit}.`, action.timestamp),
          ...state.logs,
        ],
      };
    }

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
}

function getTimestamp() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function GothamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gothamReducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <GothamContext.Provider
      value={{
        ...state,
        captureVillain: (villainId) => dispatch({ type: "CAPTURE_VILLAIN", villainId, timestamp: getTimestamp() }),
        deployGadget: (gadgetId) => dispatch({ type: "DEPLOY_GADGET", gadgetId, timestamp: getTimestamp() }),
        resolveMission: (missionId) => dispatch({ type: "RESOLVE_MISSION", missionId, timestamp: getTimestamp() }),
        resetState: () => dispatch({ type: "RESET_STATE" }),
      }}
    >
      {children}
    </GothamContext.Provider>
  );
}
