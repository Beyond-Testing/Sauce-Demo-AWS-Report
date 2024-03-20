import {test} from '@playwright/test'
import {textAssertions} from '../utils/textAssertions'
import {userCredentials} from '../utils/testData'
import {validateURL, validateTitle} from '../utils/testAssertions'
import {login} from '../utils/testActions'

test.describe('Login With Standard User', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(textAssertions.BASE_URL)
    })
    for (const dataObject of userCredentials) {
        test(`Validate User Credentials for user: ${dataObject.username}
        with password: ${dataObject.password}`, async ({page}) => {
            await validateURL(page, textAssertions.BASE_URL)
            await login(page, dataObject.username, dataObject.password)
            await validateURL(page, textAssertions.PRODUCTS_PAGE_URL)
            await validateTitle(page, 'Products')
        })
    }
})
