import {CartPage} from '@/pages/CartPage'
import {CheckoutCompletePage} from '@/pages/CheckoutCompletePage'
import {CheckoutOverviewPage} from '@/pages/CheckoutOverviewPage'
import {CheckoutPage} from '@/pages/CheckoutPage'
import {LoginPage} from '@/pages/LoginPage'
import {ProductsPage} from '@/pages/ProductsPage'
import type {BrowserContext, Page} from '@playwright/test'
import {test as base} from '@playwright/test'

interface PageFixtures {
  context: BrowserContext
  page: Page
  cartPage: CartPage
  checkoutCompletePage: CheckoutCompletePage
  checkoutOverviewPage: CheckoutOverviewPage
  checkoutPage: CheckoutPage
  loginPage: LoginPage
  productsPage: ProductsPage
}

const test = base.extend<PageFixtures>({
  context: async ({browser}, use) => {
    const context = await browser.newContext()
    await use(context)
    await context.close()
  },
  page: async ({context}, use) => {
    const page = await context.newPage()
    await use(page)
  },
  cartPage: async ({page}, use) => {
    await use(new CartPage(page))
  },
  checkoutCompletePage: async ({page}, use) => {
    await use(new CheckoutCompletePage(page))
  },
  checkoutOverviewPage: async ({page}, use) => {
    await use(new CheckoutOverviewPage(page))
  },
  checkoutPage: async ({page}, use) => {
    await use(new CheckoutPage(page))
  },
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page))
  },
  productsPage: async ({page}, use) => {
    await use(new ProductsPage(page))
  },
})

export default test
