import {expect, type Page, type Locator} from '@playwright/test'

type SelectorType = 'locator' | 'role' | 'label' | 'text'

type TextType = 'string' | 'substring'

export async function validateURL(page: Page, url: string) {
    await expect(page).toHaveURL(url)
}

export async function validateText(
    page: Page,
    selector: string,
    text: string,
    textType: TextType,
) {
    const element: Locator = page.locator(selector)

    switch (textType) {
        case 'string':
            await expect(element).toHaveText(text)
            break
        case 'substring':
            await expect(element).toContainText(text)
            break
        default:
            throw new Error(`Unknown selector type: ${textType}`)
    }
}

export async function clickOnElement(
    page: Page,
    selector: string,
    selectorType: SelectorType = 'locator',
    options?: {name: string},
) {
    let element: Locator

    switch (selectorType) {
        case 'locator':
            element = page.locator(selector)
            break
        case 'role':
            if (!options?.name) {
                throw new Error("Name option is required for 'role' selector")
            }
            element = page.getByRole(selector as any, {name: options.name})
            break
        case 'label':
            element = page.getByLabel(selector)
            break
        case 'text':
            element = page.getByText(selector)
            break
        default:
            throw new Error(`Unknown selector type: ${selectorType}`)
    }

    await element.waitFor({state: 'visible', timeout: 10000})
    await element.click()
}
