export interface Project {
  title: string;
  description: string;
  status: "production" | "development" | "offline";
  giturl: string;
  imageUrl: string;
  tags: string[];
}

export const projects: Record<string, Project> = {
  samdesk: {
    title: "samdesk",
    description: "Working on a lean engineering team, I contribute to the design and implementation of front-end features in a mission-critical SaaS platform. I own UX and design system decisions while writing and testing production-ready code in React and TypeScript. This hybrid role positions me at the intersection of engineering and product development.",
    status: "production",
    giturl: "https://gist.github.com/andrewjamesmoore/c25fbb2644ff76e3ec131b8bd746dca3",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop",
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
    description: "PyRunner is a full-stack project combining a React + TypeScript frontend with a FastAPI + MongoDB backend. It's a browser-based python editor that allows users to view documentation, explore built-in functions and methods, and run code snippets with no set up. Under the hood, PyRunner is deployed using a modern, infrastructure-as-code stack.",
    status: "production",
    giturl: "https://gist.github.com/andrewjamesmoore/b3c02cc5b4e92c83f8b49bf349e44641",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
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
    description: "Portfolio redesign (this site!) stripping away all the fancy graphics and animations for something lightweight and easy to update. The focus here is on updating consistent fields of information, and was a good opportunity to learn more about Golang and GraphQL. While it has since been updated to use local data for cost savings, the backend cleanly exposed typed schemas and resolvers, making it easy to consume and update notes and project data.",
    status: "production",
    giturl: "https://github.com/andrewjamesmoore/andrew-projects",
    imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=300&fit=crop",
    tags: ["Astro", "DaisyUI", "GraphQL", "Go", "API design", "Typescript", "MongoDB", "Vercel"],
  },
};
