import { getProjectsQuery } from "./queries";

export async function getProjects() {
  const res = await fetch("https://api.andr3w.sh/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: getProjectsQuery }),
  });

  const json = await res.json();
  console.log("GRAPHQL RESPONSE:", json);

  if (!json.data || !json.data.projects) {
    throw new Error("Projects data is missing");
  }

  return json.data.projects;
}
