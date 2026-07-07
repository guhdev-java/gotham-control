export type Page = "dashboard" | "arkham" | "missions" | "waynetech" | "terminal" | "logs" | "map" | "profile";

export type EventLog = {
  id: number;
  timestamp: string;
  type: "CAPTURE" | "DEPLOY" | "MISSION" | "SYSTEM";
  message: string;
};
