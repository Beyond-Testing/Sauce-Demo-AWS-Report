import type {Locator, Page} from '@playwright/test'
import {expect} from '@playwright/test'

type LocatorType = 'locator' | 'role' | 'label' | 'text'

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Handle different types of locators in one method
  protected getElementType(
    locator: string,
    locatorType: LocatorType = 'locator',
    roleOptions?: {name: string},
  ): Locator {
    // Default element is locator type
    let element: Locator = this.page.locator(locator)

    if (locatorType === 'role') {
      if (!roleOptions?.name) {
        throw new Error("Name option is required for 'role' locator")
      }
      element = this.page.getByRole(locator as any, {
        name: roleOptions?.name,
      })
    }
    if (locatorType === 'label') {
      element = this.page.getByLabel(locator)
    }
    if (locatorType === 'text') {
      element = this.page.getByText(locator)
    }
    return element
  }

  protected async validateText(
    locator: string,
    text: string,
    textType: 'string' | 'substring' = 'string',
    locatorType: LocatorType = 'locator',
  ): Promise<void> {
    const element: Locator = this.getElementType(locator, locatorType)

    if (textType === 'string') {
      await expect(element).toHaveText(text)
    }
    if (textType === 'substring') {
      await expect(element).toContainText(text)
    }
  }

  protected async clickOnElement(
    locator: string,
    locatorType: LocatorType = 'locator',
    roleOptions?: {name: string},
  ): Promise<void> {
    const element: Locator = this.getElementType(
      locator,
      locatorType,
      roleOptions,
    )
    await element.click()
  }

  protected async validateURL(expectedURL: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedURL)
  }

  protected async gotoURL(url: string): Promise<void> {
    await this.page.goto(url)
  }
  protected async fillInput(
    locator: string,
    text: string,
    locatorType: LocatorType = 'locator',
  ): Promise<void> {
    const element: Locator = this.getElementType(locator, locatorType)
    await element.fill(text)
  }
}
