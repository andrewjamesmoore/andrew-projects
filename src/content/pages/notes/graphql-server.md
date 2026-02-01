---
title: "GraphQL API for Portfolio (Deprecated)"
description: "Backend GraphQL API built with Go, gqlgen, and MongoDB for portfolio content, featuring Dockerized deployment on AWS EC2 with Terraform and Nginx"
---

# API for my portfolio and notes frontend (deprecated)

Backend GraphQL API for my personal portfolio site, built in Go. This service provides project and notes data consumed by the frontend.

## Table of contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Running / Development](#running--development)
- [Deployment](#deployment)
- [License and author](#license-and-author)

## About

A GraphQL API built with Go and MongoDB for portfolio projects and notes. The API is consumed by the frontend to render portfolio content dynamically. This project is no longer running in production — the data is now served directly on the frontend.

Access the old production endpoint (read-only) at: https://api.andr3w.sh

## Features

- GraphQL queries for projects and notes
- Data mutations restricted for security (CORS and no public access)
- Dockerized for local development and deployment
- Automatic data updates on the frontend via SSR, no rebuilds required

## Tech stack

- Go with [gqlgen](https://gqlgen.com) — GraphQL server
- MongoDB — Database
- Docker Compose — Container orchestration
- Nginx — Reverse proxy and SSL termination
- Certbot — HTTPS via Let's Encrypt
- Terraform — AWS EC2 infrastructure management

## Quick start

```shell
# clone the repo
git clone https://github.com/andrewjamesmoore/andrew-projects-api.git
cd andrew-projects-api

# build and run with Docker
docker-compose up --build
```

The API will be available locally (default port 8080).

## Running / Development

Run the server locally without Docker:

```shell
# build the server
go build -o server ./server.go

# run the server
./server
```

## Deployment

- Mutations are locked down; projects are added via CLI or mutation playground.
- Nginx handles SSL and reverse proxying.
- Terraform scripts are included for AWS EC2 provisioning.

## License and author

License: MIT

Author: https://github.com/andrewjamesmoore
