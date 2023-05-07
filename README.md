# Pantry App

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/shubhamlatkar/monorepo2.0/main)

This is a monorepo containing the backend and frontend code for the Pantry application. The backend is built using Node.js with Express.js and the frontend is built using React. Lerna is used to bootstrap the application.

## Getting Started

### Spin up local db using docker
```
docker run -d --name db -p 5432:5432 -e POSTGRES_DB=pantrynode -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test postgres:latest
```

### Installation
```
npm i
```

### Start
```
npm start
```

Add your [configuration](https://codesandbox.io/docs/projects/learn/setting-up/tasks) to optimize it for [CodeSandbox](https://codesandbox.io/p/dashboard).

## Resources

- [CodeSandbox — Docs](https://codesandbox.io/docs/projects)
- [CodeSandbox — Discord](https://discord.gg/Ggarp3pX5H)
