# A frontend for my projects and experiments

The frontend repository for my personal portfolio site. This project is a React + TypeScript application showcasing my projects and documenting my learning and experiments.

View the deprecated backend here: [https://github.com/andrewjamesmoore/andrew-projects-api](https://github.com/andrewjamesmoore/andrew-projects-api)

## Table of contents

* [About](#about)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Quick start](#quick-start)
* [Development](#development)
* [Deployment](#deployment)
* [License and author](#license-and-author)

## About

This repository contains the client-side application for my portfolio website. It consumes data from the separate backend repository to display projects, descriptions, and other portfolio content.

## Features

* Interactive project showcase
* Responsive design for desktop and mobile
* Dynamic content from backend API
* Multi-colour theme support
* Auto-deploys when pushed from main

## Tech stack

* Astro (frontend framework)
* React + TypeScript
* Tailwind CSS + DaisyUI for UI components
* Next.js for routing and server-side rendering
* Vercel (for deployment)

## Quick start

```bash
# clone the repo
git clone https://github.com/andrewjamesmoore/andrew-projects.git
cd andrew-projects

# install dependencies
npm install

# start dev server
npm run dev
```

## Development

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Start local dev server  |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |

## Deployment

The site is deployed via Vercel. Pushes to the `main` branch automatically trigger a production build and deployment.

## License and author

License: MIT

Author: [https://github.com/andrewjamesmoore](https://github.com/andrewjamesmoore)
