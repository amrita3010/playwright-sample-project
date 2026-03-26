import { Page,expect } from '@playwright/test';
import { findWithHealing } from '../../utils/selfHealing';
import { googleLocators } from '../../locators/google/google.locators';
import { Assertion } from '../../utils/assertion';
import { testData } from '../../test-data/google/searchData';

export class GoogleActions extends Assertion{
  // private page: Page;

 constructor(page: Page) {
        super(page)
  }

  async navigate(): Promise<void> {
    await this._page.goto('https://opensource-demo.orangehrmlive.com/');
    await this._page.waitForTimeout(10000)
    //  await this._page.pause()
    // await this._page.waitForTimeout(10000)
    //   await google.search(data.searchText);
    //   const count = await google.getResultsCount();
    //   console.log('Results found:', count);
    //   console.log('search completed');
    
    //   expect(count).toBeGreaterThan(0);
  }

  async search(text: string): Promise<void> {
    const searchBox = await findWithHealing(this._page, googleLocators.searchBox);
    await searchBox.fill(text);
    await searchBox.press('Enter');
    await this._page.waitForTimeout(10000)
    await this._page.locator('div[role="presentation"]').click()
    await this._page.pause()
  }

  async getResultsCount(): Promise<number> {
    await this._page.waitForLoadState("load",{timeout:50000})
    const results = await findWithHealing(this._page, googleLocators.searchResults);
    return await results.count();
  }

  async loginByDefaultId(): Promise<void> {
    let userPsw: string[] = await this._page.locator('//div[@class="orangehrm-login-error"]/div/p').allInnerTexts()
    const [username, password]: string[] = userPsw.map((item: string) => 
    {
      return item.split(':')[1].trim()
    })
    console.log('username :-' + username); // Admin
    console.log('password :-' + password); // admin123 
    await this._page.fill('input[name="username"]', username);
    await this._page.fill('input[name="password"]', password);
    await this._page.locator('button[type="submit"]').click()
    await this._page.waitForTimeout(5000)

  }

  async verifyUserMenuOptions(): Promise<void> {
    let menuList: string[] = await this._page
    .locator('//*[@class="oxd-main-menu"]/li/a/span[@class="oxd-text oxd-text--span oxd-main-menu-item--name"]')
    .allInnerTexts()
    await this.compareList(testData.menuItems, menuList)
  }

  async compareList(actualList: string[], expectedList: string[]): Promise<void> {
    expect.soft(actualList.sort()).toEqual(expectedList.sort())
  }
}