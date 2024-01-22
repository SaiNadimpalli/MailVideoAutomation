import { test, expect, Browser, chromium, BrowserContext } from '@playwright/test';
import { CookiesPopUpFlow } from '../src/flows/cookies-pop-up-flow';
import { VideoPlayerFunctionsFlow } from '../src/flows/video-player-functions-flow';

test.describe('Daily Video Mail Player - Next & Previous', () => {

  let cookiesPopUp: CookiesPopUpFlow;
  let videoPlayer: VideoPlayerFunctionsFlow;
  const Url = 'https://www.dailymail.co.uk/video/index.html';

  test.beforeAll(async ({}) => {
    test.setTimeout(100000);
    const browser: Browser = await chromium.launch({ headless: false,  args:['--start-maximized'] });
    const page = await browser.newPage();
    cookiesPopUp = new CookiesPopUpFlow(page);
    videoPlayer = new VideoPlayerFunctionsFlow(page);
    await page.goto(Url);
    await page.waitForLoadState('networkidle');
    //accepting the cookies
    await cookiesPopUp.acceptCookies();
    await videoPlayer.confirmVideoPlayerIsVisibleAndScrollIntoView();
    await videoPlayer.clickAndConfirmVideoIsPlaying();
    
  });

  test('Select the previous video', async () => {
    test.setTimeout(120000);
    await videoPlayer.clickAndConfirmPreviousVideoIsPlaying();
  });

  test('Select the next video', async () => {
    await videoPlayer.clickAndConfirmNextVideoIsPlaying();
  });

});
