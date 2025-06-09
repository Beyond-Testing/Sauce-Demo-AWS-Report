# Copilot Instructions

This project is a Playwright test automation framework built with TypeScript using the Page Object Model (POM) pattern. The framework is designed for end-to-end testing of web applications with a focus on maintainability, reusability, and scalability.

## Project Structure

```
src/
├── core/              # Base classes and utilities
│   ├── BasePage.ts    # Base page class with common page actions
│   └── LocatorUtils.ts # Locator handling utilities
├── pages/             # Page Object Model classes
├── locators/          # Centralized element locators
├── fixtures/          # Custom test fixtures and setup
├── helpers/           # Utility functions and helpers
├── data/              # Test data and constants
└── tests/             # Test specification files
```

### Core Architecture

- **BasePage**: Provides common page actions (click, fill, validate) that all page objects inherit
- **LocatorUtils**: Handles different locator strategies (string, role-based, label-based)
- **Custom Fixtures**: Extends Playwright's base test with pre-configured page object instances
- **Path Aliases**: Uses `@/*` for clean imports (configured in tsconfig.json)

## Coding Standards

### Naming Conventions

- Use camelCase for variable and function names
- Use PascalCase for class names (Page Objects, components)
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names for test files ending with `.spec.ts`
- Page objects should end with `Page` (e.g., `MainPage`, `LoginPage`)
- Locator objects should end with `Locators` (e.g., `mainPageLocators`)

### Code Style

- Use single quotes for strings
- Use 2 spaces for indentation
- Use arrow functions for callbacks
- Use async/await for asynchronous code
- Use const for constants and let for variables that will be reassigned
- Use destructuring for objects and arrays
- Use template literals for strings that contain variables
- Use `as const` for locator objects to ensure type safety
- Use TypeScript path aliases (`@/*`) for all internal imports

### Playwright-Specific Guidelines

#### Page Objects

- Extend `BasePage` for all page classes
- Use protected methods in BasePage, public methods in specific page classes
- Import locators from separate locator files
- Use constructor to accept Page instance and call super()

#### Locators

- Define locators in separate files using role-based or string strategies
- Use `as const` for type safety
- Support both string locators and role objects: `{role: string; name: string}`
- Prefer role-based locators for accessibility

#### Test Structure

- Import custom test fixture instead of base Playwright test
- Use destructured page objects from fixtures (e.g., `{mainPage}`)
- Structure tests with clear arrange-act-assert patterns
- Use proper TypeScript types for page objects and test data

#### Utilities and Helpers

- Environment variables should be accessed through `envUtils.ts`
- Create helper functions for common operations
- Use proper error handling with descriptive messages

### Test Organization

- Group related tests in describe blocks
- Use descriptive test names that explain the expected behavior
- Keep tests independent and atomic
- Use beforeEach/afterEach for common setup/cleanup
- Import test from custom fixtures: `import test from '@/fixtures/testSetup'`

### Error Handling

- Throw descriptive errors with context
- Use try-catch blocks for fallback locator strategies
- Validate environment variables with meaningful error messages
- Handle both exact text and contains text validation

## Architecture Patterns

### Locator Strategy

The framework supports multiple locator strategies with automatic fallback:

1. Generic CSS/XPath selectors
2. getByLabel for form elements
3. getByText for text-based elements
4. getByRole for accessibility-based selection

### Fixture Pattern

Tests use custom fixtures that provide pre-configured page object instances, eliminating the need to manually instantiate page objects in each test.

### Inheritance Pattern

- `LocatorUtils` provides locator extraction logic
- `BasePage` extends `LocatorUtils` and adds common page actions
- Specific page classes extend `BasePage` for page-specific functionality

### Data Management

- Store test data in `@/data` using TypeScript interfaces for type safety
- Use factories or builders for complex test data creation
- Separate environment-specific data from test logic
- Use JSON files for static data, TypeScript objects for dynamic data

### Assertions and Validations

- Use Playwright's native expect assertions over Jest/Chai
- Create custom assertion helpers for domain-specific validations
- Use soft assertions for multiple validations in a single test
- Implement retry logic for dynamic content assertions

### Configuration and Setup

- Use playwright.config.ts for global test configuration
- Configure multiple environments (dev, staging, prod) in separate config files
- Set up global setup/teardown for database seeding or API preparation
- Configure proper timeouts for different test types

### Reporting and Debugging

- Use Playwright's built-in HTML reporter for CI/CD pipelines
- Configure trace collection for failed tests
- Set up screenshot capture on failures
- Use video recording for complex user journey tests

### Performance Guidelines

- Use waitForLoadState strategically for SPA applications
- Implement page load performance assertions
- Use parallel test execution with proper test isolation
- Configure browser context reuse for test suites

### Mobile and Cross-Browser Testing

- Configure device emulation for mobile testing
- Set up browser-specific test configurations
- Use conditional test execution based on browser capabilities
- Implement responsive design validation helpers

### Continuous Integration

- Configure test parallelization for CI environments
- Set up proper test categorization (smoke, regression, e2e)
- Use test tags for selective test execution
- Configure artifact collection for failed test debugging

## Best Practices

- Keep page objects focused on a single page or component
- Use helper functions for common operations to avoid duplication
- Use TypeScript interfaces for test data to ensure type safety
- Use descriptive error messages for better debugging
- Implement retry logic for flaky tests

**Credential Management**

- Never hardcode passwords, API keys, or tokens in test files
- Use environment variables for all sensitive data
- Store secrets in CI/CD platform secret management systems
- Use `.env` files for local development with `.gitignore` protection

## Communication Guidelines

- If I tell you that you are wrong, think about whether or not you think that's true and respond with facts
- Avoid apologizing or making conciliatory statements
- It is not necessary to agree with the user with statements such as "You're right" or "Yes"
- Avoid hyperbole and excitement, stick to the task at hand and complete it pragmatically
- Focus on providing accurate, actionable code solutions and technical guidance
