import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

type MenuButton = {
    role: 'button'
    name: string
}

export class ProductsPage {
    readonly page: Page
    readonly cartButtonSelector: string = '[data-test="shopping-cart-link"]'
    readonly titleSelector: string = '[data-test="title"]'
    readonly openHamburgerMenu: MenuButton = {
        role: 'button',
        name: 'Open Menu',
    }
    readonly logoutButtonSelector: string = '[data-test="logout-sidebar-link"]'
    readonly addToCartItemSelector = (item: string): string =>
        `[data-test="add-to-cart-${item}"]`

    constructor(page: Page) {
        this.page = page
    }

    async verifyPageTitle(expectedTitle: string = 'Products') {
        await validateText(
            this.page,
            this.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async addItemToCart(item: string) {
        await clickOnElement(this.page, this.addToCartItemSelector(item))
    }

    async proceedToCartPage() {
        await clickOnElement(this.page, this.cartButtonSelector)
        await validateURL(this.page, url.checkoutPage)
    }

    async logout() {
        await clickOnElement(this.page, this.openHamburgerMenu.role, 'role', {
            name: this.openHamburgerMenu.name,
        })
        await clickOnElement(this.page, this.logoutButtonSelector)
        await validateURL(this.page, url.basePage)
    }
}
