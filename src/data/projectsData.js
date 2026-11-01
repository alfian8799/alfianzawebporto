import { gameProjectRecords } from "./ProjectDataGame";
import { uiUxProjectsData } from "./ProjectDataUIUX";
import { webProjectRecords } from "./ProjectDataWeb";

export const projectsData = {
  ...uiUxProjectsData,
  ...gameProjectRecords,
  ...webProjectRecords,
};

export const gameProjectsData = Object.values(gameProjectRecords);
export const webProjectsData = Object.values(webProjectRecords);
