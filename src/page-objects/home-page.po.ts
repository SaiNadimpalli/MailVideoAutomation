import { Locator } from "@playwright/test";

export class HomePage {
  private readonly homePage: Locator = this.page.locator('#page-container');
  private readonly navigationHeader: Locator = this.homePage.locator('.nav-primary.cleared.bdrgr3.cnr5');
  private readonly sportsNavigation: Locator = this.navigationHeader.locator('.sport');

  protected readonly tablePremierLeague: Locator = this.page.locator();
  constructor(protected readonly page) {}

  async goToSportsPage(): Promise<void> {
    await this.sportsNavigation.isVisible();
    await this.sportsNavigation.click(); 

  }
}