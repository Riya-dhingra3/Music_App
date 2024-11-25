import { Artist, Playist } from "./types";

export const trackTitleFilter = (title:string ) => (track:any)=>{
    return track.title?.toLowerCase().includes(title.toLowerCase());
}


export const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())


export const playListNameFilter = (name: string) => (playlist: Playist) =>
	playlist.name.toLowerCase().includes(name.toLowerCase())