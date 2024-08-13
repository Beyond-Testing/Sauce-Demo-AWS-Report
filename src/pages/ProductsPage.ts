import {type Page} from '@playwright/test'
import {url} from '../fixtures/urlData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'

export class ProductsPage {
    private page: Page
    private cardButton = '[data-test="shopping-cart-link"]'
    private title = '[data-test="title"]'
    private openHamburgerMenu = {role: 'button' as 'button', name: 'Open Menu'}
    private logoutButton = '[data-test="logout-sidebar-link"]'

    constructor(page: Page) {
        this.page = page
    }

    public async openPage() {
        await this.page.goto(url.productsPage)
        await validateURL(this.page, url.productsPage)
    }
    public async addItemsToCart(item: string) {
        await clickOnElement(this.page, `[data-test="add-to-cart-${item}"]`)
    }
    public async enterCart() {
        await clickOnElement(this.page, this.cardButton)
        await validateURL(this.page, url.checkoutPage)
    }

    public async getTitle() {
        await validateText(this.page, this.title, 'Products', 'string')
    }

    public async logout() {
        await validateURL(this.page, url.productsPage)
        await clickOnElement(this.page, this.openHamburgerMenu.role, 'role', {
            name: this.openHamburgerMenu.name,
        })
        await clickOnElement(this.page, this.logoutButton)
        await validateURL(this.page, url.basePage)
    }
}
