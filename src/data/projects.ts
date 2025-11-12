export interface Project {
  title: string;
  description: string;
  status: "production" | "development";
  link: boolean;
  url?: string;
  giturl: string;
  tags: string[];
}

export const projects: Record<string, Project> = {
  samdesk: {
    title: "samdesk",
    description:
      "Building samdesk - design and development for real-time threat detection security software.",
    status: "production",
    link: true,
    url: "https://samdesk.io",
    giturl: "https://github.com/SAMdesk",
    tags: [
      "SaaS",
      "UI Design",
      "UX",
      "React",
      "Typescript",
      "Jest",
      "Vercel",
      "Jira",
      "Agile",
    ],
  },

  pyRunnerBackend: {
    title: "py-runner-backend",
    description:
      "Designing the backend, API, and cloud infrastructure for an educational Python app.",
    status: "offline",
    link: false,
    giturl: "https://github.com/andrewjamesmoore/py-runner-backend",
    tags: [
      "Terraform",
      "FastAPI",
      "AWS",
      "MongoDB",
      "Nginx",
      "Cloud",
      "Security",
      "Docker",
      "Python",
      "CI/CD",
    ],
  },

  lastTabChromeExtension: {
    title: "last-tab-chrome-extension",
    description:
      "A simple Chrome extension that lets you use a keybind to return to the last used tab.",
    status: "production",
    link: false,
    giturl: "https://github.com/andrewjamesmoore/last-tab-chrome-extension",
    tags: ["Javascript", "Chrome", "Extension"],
  },

  figgySticks: {
    title: "figgy-sticks",
    description: "Figma plugin for using sticky notes in design files.",
    status: "production",
    link: true,
    url: "https://www.figma.com/community/plugin/1478109446396282175/figgy-sticks-sticky-notes",
    giturl: "https://github.com/andrewjamesmoore/figgy-sticks",
    tags: ["Javascript", "Figma", "HTML", "CSS", "Extension"],
  },
};
