export interface Note {
  title: string;
  description: string;
  url: string;
  date: string;
}

export const notes: Record<string, Note> = {
  shorteningUrls: {
    title: "shortening-urls-with-node-and-typescript",
    date: "2025-11",
    description:
      "a simple project to learn more about node, express and redis",
    url: "https://github.com/andrewjamesmoore/url-shortner",
  },
  encryptedCloudBackup: {
    title: "encrypted-cloud-backup",
    date: "2025-10",
    description: "experiments in encrypted syncing and cloud storage",
    url: "https://gist.github.com/andrewjamesmoore/48736ecaa900333b1c617bb4e6843cf5",
  },
  graphqlServer: {
    title: "graphql-server-using-go-and-gqlgen",
    date: "2025-08",
    description:
      "building a completely overkill go api for projects and notes",
    url: "https://github.com/andrewjamesmoore/andrew-projects-api",
  },
  tlsChatServer: {
    title: "tls-chat-server-and-client-built-with-go",
    date: "2025-07",
    description:
      "weekend learning experiment to explore low-level networking in go — specifically using net and tls to create a secure, terminal-based chat server and client.",
    url: "https://github.com/andrewjamesmoore/secure-chat",
  },
  lastTabExtension: {
  title: "last-tab-chrome-extension",
  date: "2025-07",
  description: "A minimal Chrome extension that lets you switch to your last used tab using a customizable keyboard shortcut. Like Cmd+Tab for your browser tabs.",
  url: "https://github.com/andrewjamesmoore/last-tab-chrome-extension" }, endToEndDeployment: { title: "end-to-end-deployment", date: "2025-06", description: "notes covering every stage of development and infrastructure — from local builds to production-ready automation", url: "https://gist.github.com/andrewjamesmoore/b3c02cc5b4e92c83f8b49bf349e44641", },
  figmaPlugin: {
  title: "figma-sticky-note-plugin",
  date: "2025-04",
  description: "Figgy Sticks helps you create vibrant stickies in your Figma design files with ease. A clean UI and handy keyboard shortcuts let you add multiple notes quickly",
  url: "https://github.com/andrewjamesmoore/figgy-sticks",
  },
  networkingAndCommunication: {
    title: "networking-and-communication",
    date: "2025-03",
    description:
      "a structured collection of notes covering essential networking concepts and protocols. it serves as a high-level reference to understand the fundamentals of network communication.",
    url: "https://github.com/andrewjamesmoore/networking",
  },
  zustandStateManagement: {
    title: "Zustand for react state management",
    date: "2025-02",
    description:
      "exploring state management through a basic authentication flow",
    url: "https://gist.github.com/andrewjamesmoore/0c7034c54a540b0a42cc95dc12a25f14",
  },
  };
