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
    description: "core member of a small, cross-functional team responsible for designing and building mission-critical SaaS features from the ground up. Operating in a high-compliance environment (Fortune 500, Defense), I lead key design and front-end initiatives to ensure the platform is not only robust and secure but also scalable. My work spans the full lifecycle: from ux, architecture, and design system implementation to performance optimization and testing.",
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
    title: "py-runner",
    description: "PyRunner is a full-stack project combining a React + TypeScript frontend with a FastAPI + MongoDB backend. It's a browser-based python editor that allows users to view documentation, explore built-in functions and methods, and run code snippets with no set up.\n\n Under the hood, PyRunner is deployed using a modern, infrastructure-as-code stack. Docker containers encapsulate all components — backend services, database, and reverse proxy — while deployment, networking, and SSL/TLS are managed via Terraform on AWS EC2. A GitHub Actions–driven CI/CD pipeline automates builds and pushes updates via SSH to the server, ensuring continuous deployment with minimal downtime and manual overhead.",
    status: "production",
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
