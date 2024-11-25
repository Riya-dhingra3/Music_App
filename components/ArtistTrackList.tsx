import { trackTitleFilter } from "@/helpers/filter";
import { Artist } from "@/helpers/types";
import { useNavigationsearch } from "@/hooks/useNavigationsearch";
import { useMemo } from "react";
import {StyleSheet, View,Text} from "react-native";
import { generateTrackListId } from "@/helpers/mischelaneous";
import { unkownArtistImageuri } from "@/constants/image";
import { getPriority } from "os";
import FastImage from "react-native-fast-image";
import { defaultStyle } from "@/styles";
import { fontSize } from "@/constants/tokens";
import { TracksList } from "./TracksList";
import { QueueControls } from "./QueueControls";

export const ArtistTrackList=({artist}:{artist:Artist})=>{
    const {search,isFocused}=useNavigationsearch({
        searchBarOptions:{
            placeholder:'find in songs',
            hideWhenScrolling: true,
        },
    })

    const filteredArtistTrack = useMemo(()=>{
        return artist.tracks.filter(trackTitleFilter(search))
    },[artist.tracks,search])

    return(
        <TracksList
            id={generateTrackListId(artist.name, search)}
            scrollEnabled={false}
            hideQueueControls={true}
            ListHeaderComponentStyle={styles.artistHeaderContainer}
            ListHeaderComponent={<View>
                <View style={styles.artworkImageContainer}>
                    <FastImage source={{ uri: unkownArtistImageuri, priority: FastImage.priority.normal }} style={styles.artistImage} />
                </View>
                <Text numberOfLines={1} style={styles.artistNameText}>{artist.name}</Text>

                {search.length === 0 && (
                    <QueueControls tracks={filteredArtistTrack} style={{ paddingTop: 28 }} />
                )}
            </View>}
            tracks={artist.tracks} isFocused={false}  />
    )
}

const styles= StyleSheet.create({
    artistHeaderContainer:{
        flex:1,
        marginBottom:32
    },

    artworkImageContainer:{
        flexDirection:'row',
        justifyContent:'center',
        height:200,
    },
    artistImage:{
        width:'60%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:128
    },
    artistNameText:{
        ...defaultStyle.text,
        marginTop: 22,
        textAlign:'center',
        fontSize: fontSize.lg,
        fontWeight:'800'
    }
})