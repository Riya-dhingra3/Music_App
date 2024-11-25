import { PlaylistsList } from "@/components/PlaylistsList"
import { screenPadding } from "@/constants/tokens";
import { Playist } from "@/helpers/types";
import { usePlayList, useTracks } from "@/store/library";
import { useQueue } from "@/store/queue";
import { defaultStyle } from "@/styles";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import TrackPlayer, { Track } from "react-native-track-player";

const addToPlayListModal = () =>{
    const {trackUrl}= useLocalSearchParams<{ trackUrl: Track['url'] }>()
    const {activeQueueId}=useQueue();
    const { playlist, addtoPlayList} = usePlayList();


    const tracks= useTracks();

    const track=tracks.find((currentTrak)=>trackUrl === currentTrak.url)

    if(!track){
        return null
    }

    const availablePlayList = playlist.filter(
        (playlist:Playist)=>!playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url)
    )


    const handlePlaylistPress = async (playlist: Playist)=>{
        addtoPlayList(track, playlist.name);

        // should close the moodal
        router.dismiss();

        // if the current queue is the playlist we're adding to , add the track at the end of the queue
        if(activeQueueId?.startsWith(playlist.name)){
            await TrackPlayer.add(track);
        }
    }
    return(
        <SafeAreaView style={[styles.modalcontainer,{paddingTop:70} ]}>
            <PlaylistsList playlist={availablePlayList} onPlayListPress={handlePlaylistPress}/>
        </SafeAreaView>
    )
}

export default addToPlayListModal;

const styles=StyleSheet.create({
    modalcontainer:{
        ...defaultStyle.container,
        paddingHorizontal:screenPadding.horizontal
    }
})