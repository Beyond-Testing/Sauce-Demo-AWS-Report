# Copilot Instructions

## Project Overview

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
- **Inheritance Pattern**: `LocatorUtils` → `BasePage` → Specific Page Classes
- **Fixture Pattern**: Pre-configured page object instances eliminate manual instantiation

## Security Guidelines

### Credential Management

- Never hardcode passwords, API keys, or tokens in test files
- Use environment variables for all sensitive data
- Store secrets in CI/CD platform secret management systems
- Use `.env` files for local development with `.gitignore` protection
- Access environment variables through `envUtils.ts`

## Coding Standards

### Naming Conventions

- Page objects should end with `Page` (e.g., `MainPage`, `LoginPage`)
- Locator objects should end with `Locators` (e.g., `mainPageLocators`)
- Test files should end with `.spec.ts`

### Project-Specific Code Patterns

#### Page Object Implementation

```typescript
// All page classes extend BasePage and import locators
import {BasePage} from '@/core/BasePage'
import {mainPageLocators} from '@/locators/mainPageLocators'

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }
}
```

#### Test Structure with Custom Fixtures

```typescript
// Always import from custom fixtures, not base Playwright
import test from '@/fixtures/testSetup'

test('example test', async ({mainPage}) => {
  // Use destructured page objects from fixtures
})
```

#### Locator Definitions

```typescript
// Use 'as const' for type safety and support role-based locators
export const mainPageLocators = {
  loginButton: 'button[data-testid="login"]',
  headerTitle: {role: 'heading', name: 'Welcome'},
} as const
```

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
- Framework supports multiple locator strategies with automatic fallback:
  1. Generic CSS/XPath selectors
  2. getByLabel for form elements
  3. getByText for text-based elements
  4. getByRole for accessibility-based selection

#### Test Structure

- Import custom test fixture instead of base Playwright test
- Use destructured page objects from fixtures (e.g., `{mainPage}`)
- Structure tests with clear arrange-act-assert patterns
- Use proper TypeScript types for page objects and test data

#### Environment Variables

```typescript
// Always access environment variables through envUtils.ts
import {getEnvCredentials} from '@/helpers/envUtils'

const baseUrl = getEnvCredentials('BASE_URL') // Validates and provides fallback
```

### Framework-Specific Requirements

#### Test Import Pattern

- Import test from custom fixtures: `import test from '@/fixtures/testSetup'`
- Use destructured page objects from fixtures (e.g., `{mainPage}`)

#### Locator Strategy Priority

- Framework supports multiple locator strategies with automatic fallback:
  1. Generic CSS/XPath selectors
  2. getByLabel for form elements
  3. getByText for text-based elements
  4. getByRole for accessibility-based selection

#### Test Organization Standards

- Use test tags for selective execution: `test.describe.configure({ tag: '@smoke' })`
- Import test from custom fixtures: `import test from '@/fixtures/testSetup'`
- Structure tests with clear arrange-act-assert patterns
- Keep tests independent and atomic

### Error Handling and Debugging

- Throw descriptive errors with context
- Use try-catch blocks for fallback locator strategies
- Validate environment variables with meaningful error messages
- Handle both exact text and contains text validation
- Implement custom error types for specific scenarios
- Configure timeout strategies for different test types
- Use console.log strategically for debugging complex flows
- Leverage Playwright's built-in debugging tools (trace viewer, inspector)

## Environment Configuration

### Multi-Environment Setup

- Use playwright.config.ts for global test configuration
- Configure multiple environments (dev, staging, prod) in separate config files
- Set up global setup/teardown for database seeding or API preparation
- Configure proper timeouts for different test types
- Use environment-specific base URLs and configurations
- Implement environment variable validation on startup

### Test Data Management

- Store test data in `@/data` using TypeScript interfaces for type safety
- Use factories or builders for complex test data creation
- Separate environment-specific data from test logic
- Use JSON files for static data, TypeScript objects for dynamic data
- Implement test data cleanup strategies
- Use database seeding for integration tests

## Best Practices

- Keep page objects focused on a single page or component
- Use helper functions for common operations to avoid duplication
- Implement retry logic for flaky tests
