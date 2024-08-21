import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

type MenuButton = {
    role: 'button'
    name: string
}

export class ProductsPage {
    private readonly cartButtonSelector: string =
        '[data-test="shopping-cart-link"]'
    private readonly titleSelector: string = '[data-test="title"]'
    private readonly openHamburgerMenu: MenuButton = {
        role: 'button',
        name: 'Open Menu',
    }
    private readonly logoutButtonSelector: string =
        '[data-test="logout-sidebar-link"]'
    private readonly addToCartItemSelector = (item: string): string =>
        `[data-test="add-to-cart-${item}"]`

    constructor(private readonly page: Page) {}

    async verifyPageTitle(expectedTitle: string = 'Products'): Promise<void> {
        await validateText(
            this.page,
            this.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async addItemToCart(item: string): Promise<void> {
        await clickOnElement(this.page, this.addToCartItemSelector(item))
    }

    async proceedToCartPage(): Promise<void> {
        await clickOnElement(this.page, this.cartButtonSelector)
        await validateURL(this.page, url.checkoutPage)
    }

    async logout(): Promise<void> {
        await clickOnElement(this.page, this.openHamburgerMenu.role, 'role', {
            name: this.openHamburgerMenu.name,
        })
        await clickOnElement(this.page, this.logoutButtonSelector)
        await validateURL(this.page, url.basePage)
    }
}
