import { Page, expect } from "@playwright/test";
import { HomePage } from "../page-objects/home-page.po";
import { SportPage } from "../page-objects/sports-page.po";
import { PremierLeagueTable } from "../page-objects/premier-league-table.po";

export class SportsPageFlow {

    private readonly homePage: HomePage;
    private readonly sportsPage: SportPage;
    private readonly premierLeagueTable: PremierLeagueTable;
    
    constructor(protected readonly page: Page) {
        this.homePage = new HomePage(this.page);
        this.sportsPage = new SportPage(this.page);
        this.premierLeagueTable = new PremierLeagueTable(this.page);
    }

    async goToSportsPage(): Promise<void> {
        await this.homePage.goToSportsPage();
        await this.sportsPage.confirmSportsPageIsDisplayed();
    }

    async clickOnPremierLeagueTable(): Promise<void> {
        await this.sportsPage.clickOnPremierLeagueTable();
        await this.premierLeagueTable.confirmPremierLeagueTableIsDisplayed();
    }

    async verifyTeamData(teamName: string, realteamPoints: string, realteamPos: string): Promise<void> {
       expect(await this.premierLeagueTable.getTeamPointsByTeamName(teamName)).toBe(realteamPoints);
       expect(await this.premierLeagueTable.getTeamPosition(teamName)).toBe(realteamPos);
    }

}