import {test as base} from '@playwright/test'
import {CartPage} from '../pages/CartPage'
import {CheckoutCompletePage} from '../pages/CheckoutCompletePage'
import {CheckoutOverviewPage} from '../pages/CheckoutOverviewPage'
import {CheckoutPage} from '../pages/CheckoutPage'
import {LoginPage} from '../pages/LoginPage'
import {ProductsPage} from '../pages/ProductsPage'

interface ITestFixtures {
  cartPage: CartPage
  checkoutCompletePage: CheckoutCompletePage
  checkoutOverviewPage: CheckoutOverviewPage
  checkoutPage: CheckoutPage
  loginPage: LoginPage
  productsPage: ProductsPage
}

const test = base.extend<ITestFixtures>({
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
