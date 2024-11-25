// SongsScreen.tsx
import { colors, screenPadding } from "@/constants/tokens";
import { useNavigationsearch } from "@/hooks/useNavigationsearch";
import { defaultStyle } from "@/styles";
import { View, Text } from "react-native";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import { useTracks } from "@/store/library";
import {generateTrackListId } from "@/helpers/mischelaneous";
import { TracksList } from "@/components/TracksList";

const SongsScreen = () => {
    const {search,isFocused}=useNavigationsearch({
        searchBarOptions: {
            placeholder:"Find in songs",
            textColor:colors.text,
        }
    })

    const tracks=useTracks();

    const filteredTracks = useMemo(()=>{
        if(!search){
            return tracks
        }
        return tracks.filter(trackTitleFilter(search))
    },[search,tracks])
    return (
        <View style={[defaultStyle.container, { paddingHorizontal: screenPadding.horizontal }]}>
            <TracksList id={generateTrackListId('songs',search)} tracks={filteredTracks} isFocused={isFocused} />
        </View>
    );
}

export default SongsScreen;
