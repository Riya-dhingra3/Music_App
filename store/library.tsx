import { Artist, TrackWithPlayList,Playist } from "@/helpers/types";
import { create } from "zustand";
import { Track } from "react-native-track-player";
import library from "@/assets/data/library.json"
import { useMemo } from "react";
import { unkownArtistImageuri, unkownTrackImageuri } from "@/constants/image";

interface LibraryState {
    tracks: TrackWithPlayList[],
    toggleTrackFavourite: (track:Track)=>void,
    addToPlayList: (track:Track, playlistName:string) => void
}


export const useLibraryStore = create<LibraryState>()((set)=>({
    tracks:library,
    toggleTrackFavourite: (track)=> set((state)=>({
      tracks: state.tracks.map((currentTrack)=>{
        if(currentTrack.url === track.url){
          return{
            ...currentTrack,
            rating: currentTrack.rating === 1 ? 0 : 1 
          }
        }

        return currentTrack;
      }),
    })),
    addToPlayList: (track,playlistName) => set((state)=>({
      tracks: state.tracks.map((currentTrack)=>{
        if(currentTrack.url === track.url){
          return{
            ...currentTrack,
            playlist:[...(currentTrack.playlist ?? []), playlistName]
          }
        }
        return currentTrack
      })
    }))
    
}))

export const useTracks=()=>useLibraryStore((state)=>state.tracks);

export const useFavorites = () => {
    const tracks = useLibraryStore((state) => state.tracks);
    const favourites = useMemo(() => tracks.filter((track) => track.rating === 1), [tracks]);
    const toggleTrackFavourite=useLibraryStore((state)=>state.toggleTrackFavourite);

    return{
        favourites,
        toggleTrackFavourite
    }
}

export const useArtists = () => {
    const tracks = useLibraryStore((state) => state.tracks);

    // Memoize artists based on tracks
    return useMemo(() => {
        return tracks.reduce((acc, track) => {
            const existingArtist = acc.find((artist) => artist.name === track.artist);

            if (existingArtist) {
                existingArtist.tracks.push(track);
            } else {
                acc.push({
                    name: track.artist ?? 'Unknown',
                    tracks: [track],
                });
            }
            return acc;
        }, [] as Artist[]);
    }, [tracks]); // Recompute when tracks change
};

export const usePlayList = () => {
    const tracks = useLibraryStore((state) => state.tracks);
  
    // Compute playlists
    const playlist = useMemo(() => {
      return tracks.reduce((acc, track) => {
        track.playlist?.forEach((playlistName) => {
          const existingPlayList = acc.find((playlist) => playlist.name === playlistName);
  
          if (existingPlayList) {
            existingPlayList.tracks.push(track); // Add the track to the existing playlist
          } else {
            acc.push({
              name: playlistName,
              tracks: [track],
              artworkPreview: track.artwork ?? unkownTrackImageuri, // Fallback to a default image
            });
          }
        });
        return acc;
      }, [] as Playist[]); // Initialize the accumulator as an empty array
    }, [tracks]);
  
    const addtoPlayList = useLibraryStore((state) => state.addToPlayList);
  
    return { playlist, addtoPlayList }; // Return both playlists and addtoPlayList
  };
