# prepend

Prepend strings to files.

## Why

I made this to add `/* eslint-disable */` to files generated by
`graphql-code-generator`. `@graphql-codegen/add` does not work properly for some
reason.

## Installation

- Bun

  ```
  bun add -g @rencedm112/prepend
  ```

- PNPM

  ```
  pnpm add -g @rencedm112/prepend
  ```

- Yarn

  ```
  yarn add -g @rencedm112/prepend
  ```

- NPM

  ```
  npm install -g @rencedm112/prepend
  ```

## Usage

```
prepend -c "Content to be prepended\n" -e ts -f file.ts
```

## Usage with `graphql-code-generator` config

### In your codegen.ts

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  hooks: {
    afterOneFileWrite: ["prepend -c '/* eslint-disable */\\n' -e ts -e js -f"],
  },
  // body
};
export default config;
```

> This will prepend `/* eslint-disable */` to TypeScript or JavaScript files
> generated by `graphql-code-generator`
