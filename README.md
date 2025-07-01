# projects and notes — built with Astro + Tailwind + DaisyUI

This project is a curated collection of projects, experiments, and notes, built with a focus on **rapid development**, **clean design**, and **scalable architecture**. 

It serves both as a personal site and documentation, showcasing real-world design and development projects.

> Designed and developed using [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), and [DaisyUI](https://daisyui.com/) (I much prefer CSS modules for the record)

### Features

- **Astro-first** static site — fast, lightweight, and easy to maintain
- **Scalable color system** using `HSL`, CSS custom properties, and themes
- **Componentized layout** built with Tailwind and DaisyUI utility classes
- **Theme-ready** — supports DaisyUI themes (`cupcake`, `aqua`, `dark`, etc.)
- Minimal dependencies with optional integration points for future scaling
- **Type-safe data structure** using TypeScript to model project entries

### Tech Stack

| Tool                    | Role                                         |
| ----------------------- | -------------------------------------------- |
| **Astro**               | Static site generator with partial hydration |
| **Tailwind**            | Utility-first CSS framework                  |
| **DaisyUI**             | Component and theme layer for Tailwind       |
| **TypeScript**          | Structured data + prop safety                |


### Component Examples

**`ProjectCard.astro`**

Each project is represented by a strongly-typed Astro component:

```ts
import type { Project } from "../data/projects";
const {
  title = "string",
  description = "string",
  status = "production" as Project["status"],
  link = false,
  url = "string",
  giturl = "string",
  tags = "string[]",
} = Astro.props;
```

The project data is loaded via `src/data/projects.ts` to support autocomplete and enforce structure.

```ts
  <div class='flex flex-col gap-2 w-full lg:w-1/2'>
    <div class='flex items-center gap-2'>
      <p class='text-md font-bold'>{title}</p>
      <div class='inline-grid *:[grid-area:1/1]'>
        <div class={`status rounded-none animate-ping ${currentStatus.color}`}>
        </div>
        <div class={`status rounded-none ${currentStatus.color}`}></div>
      </div>
      <p class='text-xs text-base-content opacity-30'>{currentStatus.text}</p>
    </div>
    <p class='text-sm text-base-content opacity-80'>{description}</p>
  </div>
```
Anywho - essentially a portfolio and as such always a WIP...

