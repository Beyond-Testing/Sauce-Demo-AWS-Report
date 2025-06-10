import {LocatorUtils} from '@/core/LocatorUtils'
import type {Locator, Page} from '@playwright/test'
import {expect} from '@playwright/test'

type stringOrRoleLocatorType =
  | string
  | {parent?: string; role: string; name: string}

export class BasePage extends LocatorUtils {
  constructor(page: Page) {
    super(page)
  }

  // Validate text of an element
  protected async validateText(
    locator: stringOrRoleLocatorType,
    text: string,
  ): Promise<void> {
    const extractedLocator = this.extractLocator(locator)
    try {
      await expect(extractedLocator).toHaveText(text)
    } catch {
      try {
        await expect(extractedLocator).toContainText(text)
      } catch (error) {
        throw new Error(
          `Element with locator "${locator}" does not contain text "${text}". Error: ${error}`,
        )
      }
    }
  }
  // Validate URL of the page
  protected async validateURL(expectedURL: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedURL)
  }
  // Navigate to a specific URL
  protected async gotoURL(url: string): Promise<void> {
    await this.page.goto(url)
  }
  // Click on an element
  protected async clickOnElement(
    locator: stringOrRoleLocatorType,
  ): Promise<void> {
    const extractedLocator: Locator = this.extractLocator(locator)
    await extractedLocator.click()
  }
  // Fill an input field with text
  protected async fillInput(locator: string, text: string): Promise<void> {
    const extractedLocator: Locator = this.extractLocator(locator)
    await extractedLocator.fill(text)
  }
  protected async hoverOnElement(
    locator: stringOrRoleLocatorType,
  ): Promise<void> {
    const extractedLocator: Locator = this.extractLocator(locator)
    await extractedLocator.hover()
  }
}
