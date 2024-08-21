
export interface Overlay {
    pixel_paths:       PixelPaths;
    video_start_frame: number;
}

export interface PixelPaths {
    [key: string]: Array<number[]> | undefined;
}