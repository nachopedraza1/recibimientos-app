export interface InstagramResponse {
    data: Post[];
}

export interface Post {
    id: string;
    caption: string;
    media_url: string;
    media_type: MediaType;
    timestamp: string;
    username: Username;
}

export enum MediaType {
    CarouselAlbum = "CAROUSEL_ALBUM",
    Image = "IMAGE",
    Video = "VIDEO",
}

export enum Username {
    RecibimientosCab = "recibimientos.cab",
}
