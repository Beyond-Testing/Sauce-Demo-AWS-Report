import {test} from '@playwright/test'
import {textAssertions} from '../utils/textAssertions'
import {loginData} from '../utils/testData'
import {login, loginsScenarios} from '../utils/testActions'
import {validateErrorMessage} from '../utils/testAssertions'

test.describe('Login Test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(textAssertions.BASE_URL)
    })
    test('Validate scenario with locked_out_user', async ({page}) => {
        await login(page, 'locked_out_user', 'secret_sauce')
        await validateErrorMessage(
            page,
            textAssertions.LOCKED_OUT_ERROR_MESSAGE,
        )
    })
    for (const dataObject of loginData) {
        test(`Validate login scenarios for user: ${
            dataObject.username || 'empty'
        } with password: ${dataObject.password || 'empty'}`, async ({page}) => {
            await loginsScenarios(
                page,
                dataObject.username,
                dataObject.password,
                dataObject.errorMessage,
            )
        })
    }
})
