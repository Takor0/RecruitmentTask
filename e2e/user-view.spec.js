import { test, expect } from '@playwright/test'

test.describe('User View (Add/Update User)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users/new')
    await page.waitForSelector('[data-cy="user-view"]', { timeout: 5000 })
  })

  test('should load the add user page with expected elements', async ({ page }) => {
    await expect(page.locator('[data-cy="user-view"] .view-title')).toHaveText('Add user')

    await expect(page.locator('img[alt="missing avatar"]')).toBeVisible()
  })

  test('should update user details and navigate back to the users list after saving', async ({ page }) => {
    await page.fill('[data-cy="user-detail-firstName"] input', 'John')
    await page.fill('[data-cy="user-detail-lastName"] input', 'Doe')

    const [response] = await Promise.all([
      page.waitForResponse(resp =>
        resp.url().includes('/api/users') && resp.request().method() === 'POST'
      ),
      page.click('[data-cy="update-details-btn"]')
    ])

    expect(response.status()).toBe(201)

    await expect(page).toHaveURL(/\/users$/)
  })

  test('should update the avatar when a file is selected', async ({ page }) => {
    const filePath = 'e2e/fixtures/avatar.png'
    await page.setInputFiles('[data-cy="avatar-input"] input[type="file"]', filePath)
    const avatarImg = page.locator('[data-cy="user-avatar"]')
    await expect(avatarImg).not.toHaveAttribute('src', /avatar\.png/)
  })
})

