## Style Guidelines
- Follow a consistent code style throughout the project
- Prefer composition api for vue components
- Use typescript for front-end related logic and vanilla javascript for anything that runs in node.js
- Keep components small and focused on a single responsibility
- Write self-documenting code with clear variable and function names
- Use proper error handling patterns
- Use tailwind css for styling
- Don't leave unused variables or functions
- Don't fix any linting errors manually, always run lint script from package.json when you are done

## Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`)
- composables: use the "use" prefix (e.g., `useAuth.ts`)
- Utilities/helpers: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE 

## Documentation
- Add JSDoc comments for all public functions
- Document complex logic with inline comments
- Include examples for complex utility functions

## Explanation Guidelines
- If you are asked to explain something, always write TL;DR at the end.
- If you are asked to explain something, list the advantages and disadvantages of the topic of the explanation. 
- Providing a list of disadvantages, try to provide possible solutions for them.

## Performance Considerations
- Use proper memoization techniques
- Prefer to use tools form existing codebase rather than from any library
- Be mindful of bundle size when adding dependencies