import {expect, type Page, type Locator} from '@playwright/test'

type SelectorType = 'locator' | 'role' | 'label' | 'text'

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Handle different types of selectors in one method
  protected getElementType(
    selector: string,
    selectorType: SelectorType = 'locator',
    roleOptions?: {name: string},
  ): Locator {
    // Default element is locator type
    let element: Locator = this.page.locator(selector)

    if (selectorType === 'role') {
      if (!roleOptions?.name) {
        throw new Error("Name option is required for 'role' selector")
      }
      element = this.page.getByRole(selector as any, {
        name: roleOptions?.name,
      })
    }
    if (selectorType === 'label') {
      element = this.page.getByLabel(selector)
    }
    if (selectorType === 'text') {
      element = this.page.getByText(selector)
    }
    return element
  }

  protected async validateText(
    selector: string,
    text: string,
    textType: 'string' | 'substring' = 'string',
    selectorType: SelectorType = 'locator',
  ): Promise<void> {
    const element: Locator = this.getElementType(selector, selectorType)

    if (textType === 'string') {
      await expect(element).toHaveText(text)
    }
    if (textType === 'substring') {
      await expect(element).toContainText(text)
    }
  }

  protected async clickOnElement(
    selector: string,
    selectorType: SelectorType = 'locator',
    roleOptions?: {name: string},
  ): Promise<void> {
    const element: Locator = this.getElementType(
      selector,
      selectorType,
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
    selector: string,
    text: string,
    selectorType: SelectorType = 'locator',
  ): Promise<void> {
    const element: Locator = this.getElementType(selector, selectorType)
    await element.fill(text)
  }
}
