import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class ProductsPage {
    readonly page: Page
    readonly cardButton = '[data-test="shopping-cart-link"]'
    readonly title = '[data-test="title"]'
    readonly openHamburgerMenu = {
        role: 'button' as 'button',
        name: 'Open Menu',
    }
    readonly logoutButton = '[data-test="logout-sidebar-link"]'

    constructor(page: Page) {
        this.page = page
    }

    async openPage() {
        await this.page.goto(url.productsPage)
        await validateURL(this.page, url.productsPage)
    }
    async addItemsToCart(item: string) {
        await clickOnElement(this.page, `[data-test="add-to-cart-${item}"]`)
    }
    async enterCart() {
        await clickOnElement(this.page, this.cardButton)
        await validateURL(this.page, url.checkoutPage)
    }

    async getTitle() {
        await validateText(this.page, this.title, 'Products', 'string')
    }

    async logout() {
        await validateURL(this.page, url.productsPage)
        await clickOnElement(this.page, this.openHamburgerMenu.role, 'role', {
            name: this.openHamburgerMenu.name,
        })
        await clickOnElement(this.page, this.logoutButton)
        await validateURL(this.page, url.basePage)
    }
}
