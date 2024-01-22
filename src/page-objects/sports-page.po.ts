import { Locator } from "@playwright/test";
import { HomePage } from "./home-page.po";

export class SportPage extends HomePage{

    private sportsPage: Locator = this.page.locator('.h1-page-last-updated')
    private readonly PremierLeaguetable : Locator = this.page.locator("[data-xp-module-id='tabsStatic-xpmodule']").getByText("Tables");

    constructor(protected readonly page) {
        super(page);
    }

    async confirmSportsPageIsDisplayed(): Promise<void> {
        await this.sportsPage.isVisible();
    }

    async clickOnPremierLeagueTable(): Promise<void> {
        await this.PremierLeaguetable.isVisible();
        await this.PremierLeaguetable.click();
    }
}