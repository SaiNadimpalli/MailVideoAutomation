import { Locator, Page } from "@playwright/test";

export class VideoPlayer{

    protected readonly videoPlayerScreen : Locator = this.page.locator(".vjs-video-container.vjs-fixed ");

    constructor(protected readonly page: Page) {}

    async videoPlayerScreenIsVisible(): Promise<void> {
        await this.videoPlayerScreen.isVisible();
    }

    async scroolIntoVideoPlayerView(): Promise<void> {
        await this.videoPlayerScreen.scrollIntoViewIfNeeded();
    }
}
