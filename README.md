<div align="center">
  <h1>nexus</h1>
  <h4 align="center">Self-hosteable social network</h4>
</div>

<div align="center">

![Build](https://github.com/whizzbit/nexus/workflows/build/badge.svg)
![Lint](https://github.com/whizzbit/nexus/workflows/lint/badge.svg)

</div>

> Nexus formal definition: a relationship or connection between people or things. [Source](https://www.merriam-webster.com/dictionary/nexus).

# Development

## Requirements

- NodeJS

## Getting Started

1. Clone this repository

```bash
git clone https://github.com/whizzbit/nexus-client.git
```

2. In a separate terminal session, install project dependencies.

```bash
npm install
```

3. Run the server

```bash
npm run dev
```

The project must be available on http://localhost:3000.

## GraphQL Code Generation

This project make use of URQL and GraphQL Codegen to interact with the
[server][1] GraphQL API. You must generate GraphQL server bindings and then
import them to perform any queries or mutations.

> Make sure a `.env` file is available with the same contents as `.env.example`.

> Make sure `VITE_API_URL` points to an instance of [nexus-server][1]

Execute `npm run gql:generate` to generate the `src/lib/graphql/schema.ts`
file. You must import any queries and mutations from this file and use them in
the service implementation.

# Contributing

Every kind of contribution to this project is welcome, please, don't hesitate
to open a Pull Request or Issue. I will be happy to help!

[1]: https://github.com/whizzbit/nexus-server
