import { test, expect, Browser, chromium, BrowserContext } from '@playwright/test';
import { CookiesPopUpFlow } from '../src/flows/cookies-pop-up-flow';
import { SportsPageFlow } from '../src/flows/sports-page-flow';
import { PremierLeagueTable } from '../src/page-objects/premier-league-table.po';

const teamNames: string[] = ["Manchester City", "Manchester United", "Arsenal", "Chelsea"];

export const realteamData : { teamNames: string, teamPos: string, teamPoints: string }[] = [
  { teamNames: teamNames[0],teamPos: "2", teamPoints: "43" },
  { teamNames: teamNames[1],teamPos: "7", teamPoints: "32" },
  { teamNames: teamNames[2],teamPos: "3", teamPoints: "43" },
  { teamNames: teamNames[3],teamPos: "9", teamPoints: "31" }
];

test.describe('Sports Premier League Table', () => {

  let cookiesPopUp: CookiesPopUpFlow;
  let sportsPageFlow: SportsPageFlow;
  let premierLeagueTable: PremierLeagueTable;
  
  const Url = 'https://www.dailymail.co.uk';

  test.beforeAll(async ({}) => {
    test.setTimeout(100000);
    const browser: Browser = await chromium.launch({ headless: false,  args:['--start-maximized'] });
    const page = await browser.newPage();
    cookiesPopUp = new CookiesPopUpFlow(page);
    sportsPageFlow = new SportsPageFlow(page);
    premierLeagueTable = new PremierLeagueTable(page);
     
      await page.goto(Url);
      await page.waitForLoadState('networkidle');
      //accepting the cookies
      await cookiesPopUp.acceptCookies();
      await sportsPageFlow.goToSportsPage();
      await sportsPageFlow.clickOnPremierLeagueTable();
  });

  for(let i=0; i<teamNames.length; i++){
    test(`Checking the pts for ${teamNames[i]}`, async () => {
      await sportsPageFlow.verifyTeamData(teamNames[i], realteamData[i].teamPoints, realteamData[i].teamPos);
    });
  }

});
