# Architecture

The architecture of `permalinks-hooks` is broken down into three primary layers but all provided through React Custom Hooks.

- Design Principles
  - Do one thing well
  - Minimize state management and caching
  - Separation of concerns

- Provided Hooks
  - Simple Bootstrapping
  - Simple Importing
  - Simple Query Interface
  - Simple Common Queries

## Design Principles

### Do one thing well

Each custom hook does one action and returns the response of that action. No nested actions should be exposed except via options in the input props.

### Minimize state management and caching

State management and caching can be a pain and require excessive maintenance and debugging. To reduce thse issues this library should not cache and attempt to manage state only when required.

When props come into a custom hook they must directly result in updates to the response. If actions are async, it may require a stateful hook to group together appropriate data together and return when complete.

### Separation of concerns

- src
  - hooks
  - helpers
  - documentation

#### Hooks `/src/hooks`

Hooks are the primary exposed endpoints for use are the hooks provided. Each hook should only include props, minimal state, lifecycle management, and shaping response. Any business logic such as parsing should be abstracted and imported from helpers.

#### Helpers `/src/helpers`

Helpers are the catchall for parsing and all business logic. Other projects may use `lib` or `core`.

#### Documentation `/src/documentation`

Documentation includes .MD documented examples and wrapper JSX files to enable Styleguidist to function.

## Provided Hooks

- `usePermalinks`
- `useLocation`
- `useRoute`