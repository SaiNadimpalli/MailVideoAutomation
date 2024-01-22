import { Page } from "@playwright/test";
import { VideoPlayer } from "../page-objects/video-player.po";
import { VideoPlayerControls } from "../page-objects/video-player-controls.po";

export class VideoPlayerFunctionsFlow {
    private readonly videoPlayer: VideoPlayer;
    private readonly videoPlayerControls: VideoPlayerControls;
    p
    constructor(private readonly page: Page) {
        this.videoPlayer = new VideoPlayer(this.page);
        this.videoPlayerControls = new VideoPlayerControls(this.page);
    }

    async confirmVideoPlayerIsVisibleAndScrollIntoView(): Promise<void> { 
        await this.videoPlayer.videoPlayerScreenIsVisible(); 
        await this.videoPlayer.scroolIntoVideoPlayerView(); 
    }

    async clickAndConfirmVideoIsPlaying(): Promise<void> {
        await this.videoPlayerControls.confirmVideoIsPlaying();
    }

    async clickAndConfirmVideoIsPaused(): Promise<void> {
        await this.videoPlayerControls.confirmVideoIsPaused();
    }

    async clickAndConfirmNextVideoIsPlaying(): Promise<void> {
        await this.videoPlayerControls.confirmNextVideoIsPlaying();
    }

    async clickAndConfirmPreviousVideoIsPlaying(): Promise<void> {
        await this.videoPlayerControls.confirmPreviousVideoIsPlaying();
    }

    async clickAndConfirmVideoIsMuted(): Promise<void> {
        await this.videoPlayerControls.confirmVideoIsMuted();
    }

    async clickAndConfirmVideoIsUnmuted(): Promise<void> {
        await this.videoPlayerControls.confirmVideoIsUnmuted();
    }

    async clickAndConfirmVideoIsInAutoplay(): Promise<void> {
        await this.videoPlayerControls.confirmVideoIsInAutoplay();
    }
}
   
