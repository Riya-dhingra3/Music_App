import { Track } from "react-native-track-player";

export type Playist = {
    name:string,
    tracks:Track[],
    artworkPreview: string
}

export type Artist = {
    name:string,
    tracks:Track[],
}

export type TrackWithPlayList = Track & {playlist?:string[]}