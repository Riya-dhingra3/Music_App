import { useEffect, useRef } from "react";
import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player"
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer"

const setuptrackplayer = async() =>{
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10
    })

    await TrackPlayer.setVolume(0.03);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const setSetupTrackPlayer = ({onLoad}:{onLoad:()=>void}) => {
    const isInitialized = useRef(false);

    useEffect(()=>{
        setupPlayer()
        .then(()=>{
            isInitialized.current=true;
            onLoad?.()
            TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
            });
        })
        .catch((error)=>{
            isInitialized.current=false;
            console.error(error);
        })
    },[onLoad])
}