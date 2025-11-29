export interface Project {
  title: string;
  description: string;
  status: "production" | "development" | "offline";
  giturl: string;
  tags: string[];
}

export const projects: Record<string, Project> = {
  samdesk: {
    title: "samdesk",
    description: "I am a core member of a small, cross-functional team responsible for designing and building a mission-critical SaaS features from the ground up. Operating in a high-compliance environment (Fortune 500, Defense), I led key design and front-end initiatives to ensure the platform was not only robust and secure but also scalable. My work spanned the full lifecycle: from product, architecture, and design system implementation to performance optimization and automated testing."
    status: "production",
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
    giturl: "https://gist.github.com/andrewjamesmoore/b3c02cc5b4e92c83f8b49bf349e44641",
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
    giturl: "https://github.com/andrewjamesmoore/last-tab-chrome-extension",
    tags: ["Javascript", "Chrome", "Extension"],
  },

  figgySticks: {
    title: "figgy-sticks",
    description: "Figma plugin for using sticky notes in design files.",
    status: "production",
    giturl: "https://github.com/andrewjamesmoore/figgy-sticks",
    tags: ["Javascript", "Figma", "HTML", "CSS", "Extension"],
  },
};
