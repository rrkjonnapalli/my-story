interface WorkObject {
  name: string;
  from?: Date;
  to?: Date|string;
  url?: string;
  headline: string;
  about: string;
  responsibilities: [string];
  position: string;
  // timeline?: [string];
}

interface Project {
  name: string;
  url: string;
  about: string;
}

interface Skill {
  name: string;
}

interface Langage {
  name: string;
}


export interface Profile {
  title: string;
  headline: string;
  about: string;
  mobile: string;
  email: string;
  dp: string;
  summary: [string];
  timeline: [WorkObject];
  skills: [Skill];
  langugages: [Langage],
  projects: [Project]
}
