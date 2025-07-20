export interface Project {
  id: string;
  title: string;
  description: string;
  status: "Production" | "Development" | "Archived";
  link: boolean;
  url: string;
  giturl: string;
  tags: string[];
}
