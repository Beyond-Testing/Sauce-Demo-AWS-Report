import {expect, type Page, type Locator} from '@playwright/test'

type SelectorType = 'locator' | 'role' | 'label' | 'text'

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  protected async validateText(
    selector: string,
    expectedText: string,
    textType: 'string' | 'substring' = 'string',
  ): Promise<void> {
    const element: Locator = this.page.locator(selector)

    switch (textType) {
      case 'string':
        await expect(element).toHaveText(expectedText)
        break
      case 'substring':
        await expect(element).toContainText(expectedText)
        break
      default:
        throw new Error(`Unknown selector type: ${textType}`)
    }
  }

  protected async clickOnElement(
    selector: string,
    selectorType: SelectorType = 'locator',
    options?: {name: string},
  ): Promise<void> {
    try {
      let element: Locator

      switch (selectorType) {
        case 'locator':
          element = this.page.locator(selector)
          break
        case 'role':
          if (!options?.name) {
            throw new Error("Name option is required for 'role' selector")
          }
          element = this.page.getByRole(selector as 'button', {
            name: options.name,
          })
          break
        case 'label':
          element = this.page.getByLabel(selector)
          break
        case 'text':
          element = this.page.getByText(selector)
          break
        default:
          throw new Error(`Unknown selector type: ${selectorType}`)
      }

      await element.click()
    } catch (err) {
      throw new Error(`Unable to click on element: ${selector}`)
    }
  }

  protected async validateURL(expectedURL: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedURL)
  }
  protected async gotoURL(url: string): Promise<void> {
    await this.page.goto(url)
  }

  protected async fillInput(selector: string, text: string): Promise<void> {
    await this.page.locator(selector).fill(text)
  }
}
