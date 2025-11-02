import { getNotesQuery } from "./queries";

export async function getNotes() {
  const res = await fetch("https://api.andr3w.sh/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: getNotesQuery }),
  });

  const json = await res.json();
  console.log("GRAPHQL RESPONSE:", json);

  if (!json.data || !json.data.notes) {
    throw new Error("Notes data is missing");
  }

  return json.data.notes;
}
