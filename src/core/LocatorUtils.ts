import type {Locator, Page} from '@playwright/test'

type stringOrRoleLocatorType = string | {role: string; name: string}

export class LocatorUtils {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }
  // Find a locator by string, using multiple strategies
  protected findLocatorByString(locator: string): Locator {
    // Try each method in sequence and return the first one that works
    const strategies = [
      () => this.page.locator(locator),
      () => this.page.getByLabel(locator),
      () => this.page.getByText(locator),
    ]
    for (const strategy of strategies) {
      try {
        return strategy()
      } catch {
        continue
      }
    }
    throw new Error(`Unable to find element with string locator: ${locator}`)
  }
  // Handle Generic Locator, byRole, byLabel, byText
  protected extractLocator(locator: stringOrRoleLocatorType): Locator {
    try {
      // Try generic locator
      if (typeof locator === 'string') {
        return this.findLocatorByString(locator)
        // Try role and name
      } else if (
        typeof locator === 'object' &&
        locator !== null &&
        'role' in locator &&
        'name' in locator
      ) {
        const {role, name} = locator
        return this.page.getByRole(role as any, {
          name: name,
        })
      } else {
        throw new Error(
          `Locator "${locator}" is not a valid string or role object.`,
        )
      }
    } catch {
      throw new Error(`Unable to find element with locator: ${locator}`)
    }
  }
}
