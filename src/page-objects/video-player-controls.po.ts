import { Locator, Page, expect } from "@playwright/test";
import { VideoPlayer } from "./video-player.po";

export class VideoPlayerControls extends VideoPlayer{
    
    protected readonly videoPlayButton: Locator = this.videoPlayerScreen.locator(".vjs-play-control.vjs-control");
    protected readonly videoNextButton: Locator = this.videoPlayerScreen.locator(".mol-skip-control.vjs-control");
    protected readonly videoPreviousButton: Locator = this.videoPlayerScreen.locator(".mol-previous-control.vjs-control");
    protected readonly videoVolumeButton: Locator = this.videoPlayerScreen.locator(".vjs-volume-menu-button");
    protected readonly videoPlayerCurrentTime: Locator = this.videoPlayerScreen.locator(".vjs-current-time-display");
    protected readonly videoPlayerTotalTime: Locator = this.videoPlayerScreen.locator(".vjs-duration-display");
   

    constructor(protected readonly page: Page) {
        super(page);
    }


    async confirmVideoIsPlaying(): Promise<void> {
        await this.clickVideoPlayButton();
        expect(this.videoPlayButton).toHaveClass('vjs-play-control vjs-control  vjs-playing');
    }

    async confirmVideoIsPaused(): Promise<void> {
        await this.confirmVideoIsPlaying();
        await this.clickVideoPlayButton();
        expect(this.videoPlayButton).toHaveClass('vjs-play-control vjs-control  vjs-paused', {timeout: 100000});
    }

    async confirmNextVideoIsPlaying(): Promise<void> {
        await this.clickVideoNextButton();
        await this.confirmVideoIsPlaying();
    }

    async confirmPreviousVideoIsPlaying(): Promise<void> {
        const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))
       
        await this.confirmVideoIsPlaying();
        await delay(100000);
      
        await this.clickVideoPreviousButton();
        const actualTime: string  =  ((await this.videoPlayerCurrentTime.allTextContents())[0].trim().split(" ")[2]);
        expect(parseFloat(actualTime)).toBeLessThan(0.1);
    }

    async confirmVideoIsMuted(): Promise<void> {
        await this.clickVideoVolumeButton();
        expect(this.videoVolumeButton).toHaveClass('vjs-volume-menu-button vjs-menu-button vjs-control vjs-vol-0');
    }

    async confirmVideoIsUnmuted(): Promise<void> {
        await this.clickVideoVolumeButton();
        expect(this.videoVolumeButton).toHaveClass('vjs-volume-menu-button vjs-menu-button vjs-control vjs-vol-3');
    }

    async confirmVideoIsInAutoplay(): Promise<void> {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
       
        await delay(10000);
      
        const actualTime: string  =  ((await this.videoPlayerCurrentTime.allTextContents())[0].trim().split(" ")[2]);
        const totalTime: string  =  ((await this.videoPlayerTotalTime.allTextContents())[0].trim().split(" ")[2]);
        expect(parseFloat(actualTime)).toBeCloseTo(parseFloat(totalTime));
    }

    private async clickVideoVolumeButton(): Promise<void> {
        await this.videoVolumeButtonIsVisible();
        await this.videoVolumeButton.click();
    }

    private async clickVideoNextButton(): Promise<void> {
        await this.videoNextButtonIsVisible();
        await this.videoNextButton.click();
    }

    private async clickVideoPreviousButton(): Promise<void> {
        await this.videoPreviousButtonIsVisible();
        await this.videoPreviousButton.click();
    }

    private async clickVideoPlayButton(): Promise<void> {
        await this.videoPlayButtonIsVisible();
        await this.videoPlayButton.click();
    }

    private async videoPlayButtonIsVisible(): Promise<void> {
        await this.videoPlayButton.isVisible();
    }

    private async videoPreviousButtonIsVisible(): Promise<void> {
        try{
            await this.page.waitForSelector('.mol-previous-control.vjs-control', { state: 'attached' });
            await this.videoPreviousButton.isVisible({timeout: 100000});
        }catch(e){
            console.log(e);
        }
    }

    private async videoNextButtonIsVisible(): Promise<void> {
        await this.videoNextButton.isVisible();
    }

   private async videoVolumeButtonIsVisible(): Promise<void> {
        await this.videoVolumeButton.isVisible();
    }
}