import { Page } from "@playwright/test";
import { CookiesPopUp } from "../page-objects/cookies-pop-up.po";
export class CookiesPopUpFlow {
    private readonly cookiesPopUp: CookiesPopUp;
    
    constructor(protected readonly page: Page) {
        this.cookiesPopUp = new CookiesPopUp(this.page);
        
    }
    async acceptCookies() {
        await this.cookiesPopUp.acceptCookies();
    }
    
}