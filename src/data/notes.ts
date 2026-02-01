export interface Note {
	title: string;
	description: string;
	date: string;
	contentPath: string; // path to modal content
	externalUrl?: string; // optional external link (for repos)
}

export const notes: Record<string, Note> = {
	cryptographicFailures: {
		title: "a04-cryptographic-failures",
		date: "2026-01",
		description:
			"notes and working snippets from my exploration of OWASP Top 10 A04 Cryptographic Failures",
		contentPath: "/notes/cryptographic-failures",
	},
	brokenAccessControl: {
		title: "a01-broken-access-control",
		date: "2025-12",
		description:
			"exploting owasp a01 broken access control to gain unauthorized access to sensitive data or functionality",
		contentPath: "/notes/broken-access-control",
	},
	shorteningUrls: {
		title: "shortening-urls-with-node-and-typescript",
		date: "2025-11",
		description: "a simple project to learn more about node, express and redis",
		contentPath: "/notes/shortening-urls",
		externalUrl: "https://github.com/andrewjamesmoore/url-shortner",
	},
	encryptedCloudBackup: {
		title: "encrypted-cloud-backup",
		date: "2025-10",
		description: "experiments in encrypted syncing and cloud storage",
		contentPath: "/notes/encrypted-cloud-backup",
	},
	graphqlServer: {
		title: "graphql-server-using-go-and-gqlgen",
		date: "2025-08",
		description: "building a completely overkill go api for projects and notes",
		contentPath: "/notes/graphql-server",
		externalUrl: "https://github.com/andrewjamesmoore/andrew-projects-api",
	},
	tlsChatServer: {
		title: "tls-chat-server-and-client-built-with-go",
		date: "2025-07",
		description:
			"weekend learning experiment to explore low-level networking in go — specifically using net and tls to create a secure, terminal-based chat server and client.",
		contentPath: "/notes/tls-chat-server",
		externalUrl: "https://github.com/andrewjamesmoore/secure-chat",
	},
	lastTabExtension: {
		title: "last-tab-chrome-extension",
		date: "2025-07",
		description:
			"A minimal Chrome extension that lets you switch to your last used tab using a customizable keyboard shortcut. Like Cmd+Tab for your browser tabs.",
		contentPath: "/notes/last-tab-extension",
		externalUrl: "https://github.com/andrewjamesmoore/last-tab-chrome-extension",
	},
	endToEndDeployment: {
		title: "end-to-end-deployment",
		date: "2025-06",
		description:
			"notes covering every stage of development and infrastructure — from local builds to production-ready automation",
		contentPath: "/notes/end-to-end-deployment",
	},
	figmaPlugin: {
		title: "figma-sticky-note-plugin",
		date: "2025-04",
		description:
			"Figgy Sticks helps you create vibrant stickies in your Figma design files with ease. A clean UI and handy keyboard shortcuts let you add multiple notes quickly",
		contentPath: "/notes/figma-plugin",
		externalUrl: "https://github.com/andrewjamesmoore/figgy-sticks",
	},
	networkingAndCommunication: {
		title: "networking-and-communication",
		date: "2025-03",
		description:
			"a structured collection of notes covering essential networking concepts and protocols. it serves as a high-level reference to understand the fundamentals of network communication.",
		contentPath: "/notes/networking-and-communication",
		externalUrl: "https://github.com/andrewjamesmoore/networking",
	},
	zustandStateManagement: {
		title: "Zustand for react state management",
		date: "2025-02",
		description:
			"exploring state management through a basic authentication flow",
		contentPath: "/notes/zustand-state-management",
	},
};
