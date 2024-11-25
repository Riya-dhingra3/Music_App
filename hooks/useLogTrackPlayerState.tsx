import {Event,useTrackPlayerEvents} from "react-native-track-player"

const events= [Event.PlaybackError , Event.PlaybackState , Event.PlaybackActiveTrackChanged]
export const useLogTrackPlayerState = () => {
    useTrackPlayerEvents(events, async(event)=>{
        if(event.type === Event.PlaybackError){
            console.warn('An error occured: ',event);
        }

        if(event.type === Event.PlaybackState){
            console.log('Playback State: ',event.state);
        }

        if(event.type === Event.PlaybackActiveTrackChanged){
            console.log('Track Changed: ',event.index);
        }
    })
}