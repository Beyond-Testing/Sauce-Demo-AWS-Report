import {type Page} from '@playwright/test'
import {Product} from '../fixtures/productsData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'

export class CheckoutOverviewPage {
    protected readonly page: Page
    protected readonly titleSelector = '[data-test="title"]'
    protected readonly totalPriceAfterTaxSelector = '[data-test="total-label"]'
    protected readonly finishButtonSelector = '[data-test="finish"]'

    constructor(page: Page) {
        this.page = page
    }
    async verifyPageTitle(expectedTitle: string = 'Checkout: Overview') {
        await validateText(
            this.page,
            this.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async completeCheckout() {
        await clickOnElement(this.page, this.finishButtonSelector)
        await validateURL(this.page, url.checkoutCompletePage)
    }

    calculateTotalPriceAfterTax(
        productDetails: Product[],
        taxRate: number = 0.08,
    ): string {
        const totalPriceBeforeTax = productDetails.reduce(
            (total, product) =>
                total + parseFloat(product.price.replace('$', '')),
            0,
        )
        const totalTax = totalPriceBeforeTax * taxRate
        const finalPrice = totalPriceBeforeTax + totalTax
        return finalPrice.toFixed(2)
    }

    async verifyTotalPrice(products: Product[]) {
        const calculatedTotalPrice = this.calculateTotalPriceAfterTax(products)
        await validateText(
            this.page,
            this.totalPriceAfterTaxSelector,
            calculatedTotalPrice,
            'substring',
        )
    }
}
