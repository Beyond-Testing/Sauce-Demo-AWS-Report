import {type Page} from '@playwright/test'
import {Product} from '../fixtures/productsData'
import {clickOnElement, validateText, validateURL} from '../helpers/utils'
import {url} from '../fixtures/urlData'
import {CheckoutOverViewLocators} from '../locators/CheckoutOverviewLocators'

export class CheckoutOverviewPage {
    constructor(private readonly page: Page) {}

    async verifyPageTitle(
        expectedTitle: string = 'Checkout: Overview',
    ): Promise<void> {
        await validateText(
            this.page,
            CheckoutOverViewLocators.titleSelector,
            expectedTitle,
            'string',
        )
    }

    async completeCheckout(): Promise<void> {
        await clickOnElement(
            this.page,
            CheckoutOverViewLocators.finishButtonSelector,
        )
        await validateURL(this.page, url.checkoutCompletePage)
    }

    calculateTotalPriceAfterTax(
        productDetails: Product[],
        taxRate: number = 0.08,
    ): string {
        const totalPriceBeforeTax = productDetails.reduce(
            (total: number, product: Product) =>
                total + parseFloat(product.price.replace('$', '')),
            0,
        )
        const totalTax = totalPriceBeforeTax * taxRate
        const finalPrice = totalPriceBeforeTax + totalTax
        return finalPrice.toFixed(2)
    }

    async verifyTotalPrice(products: Product[]): Promise<void> {
        const calculatedTotalPrice = this.calculateTotalPriceAfterTax(products)
        await validateText(
            this.page,
            CheckoutOverViewLocators.totalPriceAfterTaxSelector,
            calculatedTotalPrice,
            'substring',
        )
    }
}
