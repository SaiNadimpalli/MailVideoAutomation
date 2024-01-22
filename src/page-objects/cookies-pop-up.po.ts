import { Locator, Page } from "@playwright/test";
export class CookiesPopUp{

   private readonly cookiesPopUpAcceptButton: Locator = this.page.getByText("Got it");
   
    constructor(protected readonly page: Page) {}

    async acceptCookies(): Promise<void> {
        await this.cookiesPopUpAcceptButton.click();
    }
}