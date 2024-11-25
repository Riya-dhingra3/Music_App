import { useFavorites } from "@/store/library";
import { useCallback } from "react";
import TrackPlayer, { useActiveTrack } from "react-native-track-player"

export const useTrackPlayerFavourite = () => {
    const activeTrack = useActiveTrack();

    const {favourites , toggleTrackFavourite} = useFavorites();

    const isFavourite = favourites.find((track) => track.url === activeTrack?.url)?.rating === 1

    // We are updating both the track player internal state and application internal store
    const toggleFavourite = useCallback(async()=>{
        const id = await TrackPlayer.getActiveTrackIndex();

        if(id == null){
            return
        }

        // updating track player internal state
        await TrackPlayer.updateMetadataForTrack(id,{
            rating: isFavourite ? 0 : 1
        })

        // updating the app internal state
        if(activeTrack){
            toggleTrackFavourite(activeTrack);
        }
    },[isFavourite,toggleTrackFavourite,activeTrack])

    return { isFavourite,toggleFavourite }

}