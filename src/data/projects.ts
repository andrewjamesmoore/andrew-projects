export interface Project {
  title: string;
  description: string;
  status: "production" | "development" | "offline";
  giturl: string;
  tags: string[];
}

export const projects: Record<string, Project> = {
  samdesk: {
    title: "Colour System: Quarks",
    description:
      "Developing a robust colour system in typescript and css for the Quarks design system",
    status: "production",
    giturl:
      "https://gist.github.com/andrewjamesmoore/c25fbb2644ff76e3ec131b8bd746dca3",
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
    description:
      "PyRunner is a full-stack project combining a React + TypeScript frontend with a FastAPI + MongoDB backend",
    status: "production",
    giturl:
      "https://gist.github.com/andrewjamesmoore/b3c02cc5b4e92c83f8b49bf349e44641",
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

  andrewProjects: {
    title: "portfolio-redesign",
    description:
      "Portfolio redesign (this site!) stripping away all the fancy graphics and animations for something lightweight and easy to update. The focus here is on updating consistent fields of information, and was a good opportunity to learn more about Golang and GraphQL. While it has since been updated to use local data for cost savings, the backend cleanly exposed typed schemas and resolvers, making it easy to consume and update notes and project data.",
    status: "production",
    giturl: "https://github.com/andrewjamesmoore/andrew-projects",
    tags: [
      "Astro",
      "DaisyUI",
      "GraphQL",
      "Go",
      "API design",
      "Typescript",
      "MongoDB",
      "Vercel",
    ],
  },
};
