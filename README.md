# Overview

This repo contains miscellaneous projects using TypeScript 5.x, Vue 3, and NestJS.  It's set up using [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces).

# Managing Workspace

In the root directory, run `npm i`, and it should install all dependencies for all projects.

## Dependencies

To install a dep in a project, run `npm i $depName -w $workspaceName` from the root dir.

## Updating Dependencies

There is a [script](https://github.com/incutonez/Sandbox/blob/main/updateDependencies.js) in the root dir that will run through all the projects and update their deps to the latest.  By doing this, I try to lock the same dep version for all projects (if they share a dep).
