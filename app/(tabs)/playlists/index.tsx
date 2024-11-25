import { PlaylistsList } from "@/components/PlaylistsList";
import { screenPadding } from "@/constants/tokens";
import { playListNameFilter } from "@/helpers/filter";
import { Playist } from "@/helpers/types";
import { useNavigationsearch } from "@/hooks/useNavigationsearch";
import { usePlayList } from "@/store/library";
import { defaultStyle } from "@/styles";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View,Text, ScrollView } from "react-native";

const PlayListScreen=()=>{

    const router=useRouter();

    const {search,isFocused}=useNavigationsearch({
        searchBarOptions:{
            placeholder:"Find in playlists"
        }
    })

    const {playlist,addtoPlayList}=usePlayList();

    const handlePlayListPress = (playlist: Playist) =>{
        router.push(`/(tabs)/playlists/${playlist.name}`)
    }

    const filteredPlayList = useMemo(()=>{
        if(!search){
            return playlist;
        }
        return playlist.filter(playListNameFilter(search));
    },[playlist,search])
    return(
        <View style={defaultStyle.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{paddingHorizontal: screenPadding.horizontal}}>
                <PlaylistsList scrollEnabled={false} playlist={filteredPlayList} onPlayListPress={handlePlayListPress} />
            </ScrollView>
        </View>
    )
}

export default PlayListScreen