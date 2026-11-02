import { gameProjectRecords } from "./ProjectDataGame";
import { aiProjectRecords } from "./AIprojectData";
import { uiUxProjectsData } from "./ProjectDataUIUX";
import { webProjectRecords } from "./ProjectDataWeb";

export const projectsData = {
  ...uiUxProjectsData,
  ...gameProjectRecords,
  ...webProjectRecords,
  ...aiProjectRecords,
};

export const gameProjectsData = Object.values(gameProjectRecords);
export const webProjectsData = Object.values(webProjectRecords);
export const aiProjectsData = Object.values(aiProjectRecords);
