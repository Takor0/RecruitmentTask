import { test, expect } from '@playwright/test'

test.describe('Users View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users')
    await page.waitForSelector('.users-view')
  })

  test('displays list of users and filters by search term', async ({ page }) => {
    await page.waitForTimeout(500)
    const userRows = await page.locator('table tbody tr').all()
    expect(userRows.length).toBeGreaterThan(0)
    const searchInput = page.locator('input.search-input')
    await searchInput.fill('George')
    await page.waitForTimeout(500)
    const filteredRows = await page.$$('table tbody tr')
    for (const row of filteredRows) {
      const rowText = await row.innerText()
      expect(rowText.toLowerCase()).toContain('george')
    }
  })

  test('navigates to the new user page when clicking Add User', async ({ page }) => {
    await page.click('button:has-text("Add User")')
    await expect(page).toHaveURL(/\/users\/new/)
  })

  test('deletes a user when clicking delete and accepting confirmation', async ({ page }) => {
    await page.goto('/users')
    await page.waitForTimeout(500)
    page.once('dialog', async (dialog) => {
      expect(dialog.message().toLowerCase()).toContain('are you sure')
      await dialog.accept()
    })
    const deleteButton = page.locator('[data-cy="delete-button"]').first()
    await deleteButton.click()
    const confirmButton = page.locator('[data-cy="confirm-button"]').first()

    const [response] = await Promise.all([
      page.waitForResponse(resp =>
        resp.url().includes('/api/users') && resp.status() === 204
      ),
      confirmButton.click()
    ])

    expect(response.status()).toBe(204)
  })
})
