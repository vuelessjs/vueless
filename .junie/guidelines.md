# Vueless Development Guidelines

## Project Overview
Vueless is a Vue Styleless UI Component Library powered by Tailwind CSS. It provides unstyled, customizable UI components for Vue 3 applications.

## Tech Stack
- **Vue 3**: Component framework
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS v4**: Utility-first CSS framework
- **Storybook**: Component documentation and development environment
- **Vitest**: Testing framework
- **ESLint + Prettier**: Code quality and style enforcement

## Project Structure
```
vueless/
├── .github/          # GitHub workflows and templates
├── .scripts/         # Build and utility scripts
├── .storybook/       # Storybook configuration
├── docs/             # Documentation
├── public/           # Static assets
├── src/              # Source code
│   ├── adapter.locale/ # Internationalization adapters
│   ├── bin/          # CLI tools and commands
│   ├── composables/  # Vue composables
│   ├── directives/   # Vue directives
│   ├── utils/        # Utility functions
│   ├── ui.*/         # UI components organized by type
│   └── ...
└── test/             # Test configuration
```

### Component Structure
Each component follows a consistent structure:
```
ui.component-name/
├── storybook/                    # Storybook documentation
├── tests/                        # Component tests
├── config.ts                     # Component configuration
├── constants.ts                  # Component-specific constants
├── types.ts                      # TypeScript type definitions
├── UComponent.vue                # Main Vue component
├── UComponentSubcomponent.vue    # Optional subcomponents
├── useFeature.ts                 # Optional composables
└── utilFeature.ts                # Optional utility functions
```

## Development Workflow

### Setup
```bash
# Install dependencies
npm install
```

### Development
```bash
# Start Storybook development server
npm run dev

# Start Storybook with documentation
npm run dev:docs
```

### Testing
```bash
# Run tests
npm run test

# Run tests in CI mode
npm run test:ci
```

### Linting
```bash
# Check for linting issues
npm run lint

# Fix linting issues
npm run lint:fix
```

### Building
```bash
# Build Storybook
npm run build

# Preview the build
npm run preview
```

## Testing Guidelines
- Use Vitest and Vue Test Utils for component testing
- Test files should be placed in the `tests` directory of each component
- Follow the naming convention: `UComponent.test.ts`
- Test component props, slots, events, and exposed refs
- Add comments above each test to shortly describe what is testing, example `// ImageUrl prop`. 
- Use forEach for testing variants, the same as in `UButton.test.ts`
- Add types to the props for variants by using `as` keyword like `color: color as Props["color"],`
- Use constants for test values and props instead of hardcoded strings, but do not use values directly from the `defaultConfig`
- Ensure props constant names match the prop names, and in tests, destructure props simply as { someProp1, someProp2 } instead of using { someProp1: someProp1, someProp2: someProp2 }.
- Derive class names from component properties rather than hardcoding them
- Name constants that hold slot class should be named `slotClass` or `*SlotClass`
- When testing class-related props, match expected classes from the component’s CVA config in `config.ts`
- Run tests by using command `npm run test:ci src/ui.[component-folder]`]
- Import types with `type` keyword, example `import type { ComponentPublicInstance } from "vue"`

## Best Practices
- Follow the established component structure for new components
- Use TypeScript for type safety
- Document component props, events, and slots by following the Vue Styleguidist jsDoc comments
- Create Storybook stories for each component with real-life examples
- Simplify the component’s `storybook/docs.mdx` file to match the minimal structure used in other components
- All css classes should be defined in component config
- Write comprehensive tests for components
- Use composables for shared logic
- Use subcomponent if the main component is too large
- Follow the naming conventions for components and files


## Junie Agent Commands
- Run linter and fix issues for all created and modified files before each task is done, including test case modifications or any other file modification
