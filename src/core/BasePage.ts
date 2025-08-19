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
          `Element with locator "${JSON.stringify(
            locator,
          )}" does not contain text "${text}". Error: ${error}`,
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
  
  // Hover on an element
  protected async hoverOnElement(
    locator: stringOrRoleLocatorType,
  ): Promise<void> {
    const extractedLocator: Locator = this.extractLocator(locator)
    await extractedLocator.hover()
  }

  // Validate that an element is visible
  protected async validateVisibility(
    locator: stringOrRoleLocatorType,
  ): Promise<void> {
    const extractedLocator = this.extractLocator(locator)
    try {
      await expect(extractedLocator).toBeVisible()
    } catch {
      try {
        await expect(extractedLocator.first()).toBeVisible()
      } catch {
        throw new Error(
          `Element with locator "${JSON.stringify(locator)}" is not visible.`,
        )
      }
    }
  }

  // Wait for an element to be in a specific state
  protected async waitForSelectorState(
    locator: string,
    options?: {state?: 'attached' | 'detached' | 'visible' | 'hidden'},
  ): Promise<void> {
    await this.page.waitForSelector(locator, {state: options?.state})
    await this.validateVisibility(locator)
  }
}
