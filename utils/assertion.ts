import { Page } from '@playwright/test';
import {expect} from '@playwright/test'

export class Assertion {

    protected _page: Page

    constructor(page: Page) {
        this._page = page
    }

    async compareList(actualList: string[], expectedList: string[]): Promise<void> {
        expect.soft(actualList.sort()).toEqual(expectedList.sort())
    }
}