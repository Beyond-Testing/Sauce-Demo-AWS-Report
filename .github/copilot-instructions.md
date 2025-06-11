# Copilot Instructions

## Project Overview

This project is a Playwright test automation framework built with TypeScript using the Page Object Model (POM) pattern. It is designed for end-to-end testing of web applications with a focus on maintainability, reusability, and scalability.

## Project Structure

```
src/
├── core/           # Base classes and utilities
├── pages/          # Page Object Model classes
├── locators/       # Centralized element locators
├── fixtures/       # Custom test fixtures and setup
├── helpers/        # Utility functions and helpers
├── data/           # Test data and constants
└── tests/          # Test specification files
```

## Key Patterns & Conventions

- Page objects: `*Page` (e.g., `MainPage`)
- Locators: `UPPER_SNAKE_CASE` with `_LOCATORS` suffix (e.g., `MAIN_PAGE_LOCATORS`)
- Test files: end with `.spec.ts`

### Page Object Example

```typescript
import {BasePage} from '@/core/BasePage'
import {BASE_URL} from '@/data/urls'
import test from '@/fixtures/testSetup'
import {MAIN_PAGE_LOCATORS} from '@/locators/Main_Page'
import {type Page} from '@playwright/test'

export class MainPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }
  async openMainPage(): Promise<void> {
    await test.step('Open main page', async () => {
      await this.page.goto(BASE_URL)
      await this.validateText(
        MAIN_PAGE_LOCATORS.importantFactsTitle,
        'עובדות שחשוב שתדע',
      )
    })
  }
}
```

### Test Example

```typescript
import test from '@/fixtures/testSetup'
test('test', async ({mainPage}) => {
  await mainPage.openMainPage()
})
```

### Locator Example

```typescript
export const MAIN_PAGE_LOCATORS = {
  importantFactsTitle: {
    role: 'heading',
    name: 'עובדות שחשוב שתדע',
  },
} as const
```

## Core Guidelines

- All page objects extend `BasePage` and import locators from separate files
- Use `test.step()` for grouping logical actions in page object methods
- Locators support both string and role-based objects; prefer role-based for accessibility
- Use destructured page objects from fixtures in tests (e.g., `{mainPage}`)
- Access environment variables only via `envUtils.ts`
- Use TypeScript interfaces for test data in `@/data`

## Locator Strategy

- Automatic fallback: CSS/XPath → getByLabel → getByText → getByRole
- Locator type: `string | {parent?: string; role: string; name: string}`

## Best Practices

- Keep page objects focused and reusable; use helper functions for common actions
- Prefer role-based locators and descriptive error messages
- Implement retry logic for flaky tests

## Environment & Data

- Use `.env` for secrets (never hardcode)
- Configure multiple environments in Playwright config
- Store test data in `@/data` using interfaces

## Error Handling

- Throw descriptive errors with context
- Use try-catch for locator fallbacks
- Validate environment variables on startup

---

This file is intentionally concise. For standard Playwright/TypeScript practices, follow the official docs. Focus here is on unique project patterns and conventions.
