import type {Locator, Page} from '@playwright/test'

type stringOrRoleLocatorType =
  | string
  | {role: string; name: string}
  | {parent: string; role: string; name: string}

export class LocatorUtils {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Find a locator by string, using multiple strategies
  protected findLocatorByString(locator: string): Locator {
    const strategies = [
      () => this.page.locator(locator),
      () => this.page.getByLabel(locator),
      () => this.page.getByText(locator),
    ]
    // Iterate through strategies until one succeeds
    for (const strategy of strategies) {
      try {
        return strategy()
      } catch {
        continue
      }
    }
    throw new Error(
      `Unable to find element with string locator: ${JSON.stringify(locator)}`,
    )
  }

  // Handle Generic Locator, byRole, byLabel, byText, and parent-child combinations
  protected extractLocator(locator: stringOrRoleLocatorType): Locator {
    try {
      // Try Generic Locator first
      if (typeof locator === 'string') {
        return this.findLocatorByString(locator)
      }
      // Handle byRole with and without parent
      if ('parent' in locator) {
        const {parent, role, name} = locator
        return this.page.locator(parent).getByRole(role as any, {name: name})
      } else {
        const {role, name} = locator
        return this.page.getByRole(role as any, {name: name})
      }
    } catch {
      throw new Error(
        `Unable to find element with locator: ${JSON.stringify(locator)}`,
      )
    }
  }
}
