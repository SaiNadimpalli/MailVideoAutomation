import { Locator, Page } from "@playwright/test";
import { SportPage } from "./sports-page.po";

export class PremierLeagueTable extends SportPage{
    private readonly premierLeagueTable: Locator = this.page.locator("[data-xp-module-id='resultsBlock-xpmodule']");
    private readonly competitionTable : Locator = this.premierLeagueTable.locator(".competitionTable_2Shs1.displayMode-medium_3UtlF");
    private readonly competitionTableRow: Locator = this.competitionTable.locator("tbody").locator("tr");
  

    constructor(protected readonly page: Page) {
        super(page);
    }

    async confirmPremierLeagueTableIsDisplayed(): Promise<void> {     
        await this.premierLeagueTable.isVisible();
        await this.premierLeagueTable.scrollIntoViewIfNeeded();
    }

    async getTeamPointsByTeamName(teamName: string): Promise<string | undefined> {
        const rowIndex = await this.getRowIndexByTeamName(teamName);
       
        if(rowIndex !== undefined){
            return (await this.competitionTableRow.nth(rowIndex).locator("td").nth(9).allTextContents())[0].trim();
        }
        return undefined;
    }

    async getTeamPosition(teamName: string): Promise<string | undefined> {
        const rowIndex = await this.getRowIndexByTeamName(teamName);
        if(rowIndex !== undefined){
            return (await this.competitionTableRow.nth(rowIndex).locator("td").nth(0).allTextContents())[0].trim();
        }
        return undefined;
    }

    private async getRowIndexByTeamName(teamName: string): Promise<number | undefined> {
        await this.competitionTable.scrollIntoViewIfNeeded();
       
        const rows = await this.competitionTableRow.count();
        for(let row_index=0; row_index<rows-1; row_index++){
           if((await this.competitionTableRow.nth(row_index).allTextContents())[0].trim().toString().includes(teamName)){
               return row_index;
           }
        }
        return undefined;
    }
}