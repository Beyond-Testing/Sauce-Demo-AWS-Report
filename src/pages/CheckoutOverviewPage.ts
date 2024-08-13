import {type Page} from '@playwright/test'
import {Product} from '../fixtures/productsData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'

export class CheckoutOverviewPage {
    private page: Page
    private title = '[data-test="title"]'
    private totalPriceAfterTax = '[data-test="total-label"]'
    private finishButton = '[data-test="finish"]'

    constructor(page: Page) {
        this.page = page
    }
    public async getTitle() {
        await validateText(
            this.page,
            this.title,
            'Checkout: Overview',
            'string',
        )
    }

    public async finishCheckout() {
        await clickOnElement(this.page, this.finishButton)
        await validateURL(this.page, url.checkoutCompletePage)
    }

    private getTotalPriceAfterTax(
        productDetails: Product[],
        taxRate: number = 0.08,
    ) {
        const totalPriceBeforeTax = productDetails.reduce(
            (total, product) =>
                total + parseFloat(product.price.replace('$', '')),
            0,
        )
        const totalTax = totalPriceBeforeTax * taxRate
        const finalPrice = totalPriceBeforeTax + totalTax
        return finalPrice.toFixed(2)
    }

    public async checkTotalPrice(products: Product[]) {
        await validateText(
            this.page,
            this.totalPriceAfterTax,
            this.getTotalPriceAfterTax(products),
            'substring',
        )
    }
}
