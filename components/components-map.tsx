import { Details } from "./details"
import Events from "./events"
import Qout from "./qout"
import Refresh from "./refresh"
import { Soon } from "./soon"
import { Timer } from "./timer"
import Profile from "./profile"

export enum ComponentsOptions  {
  "Details" = "Details",
  "Timer" = "Timer",
  "Refresh" = "Refresh",
  "Soon" = "Soon",
  "Qout" = "Qout",
  "Events" = "Events",
  "Profile" = "Profile",
}

export const ComponentsMap = {
  "Details": Details,
  "Timer": Timer,
  "Refresh": Refresh,
  "Soon": Soon,
  "Qout": Qout,
  "Events": Events,
  "Profile": Profile,
}
