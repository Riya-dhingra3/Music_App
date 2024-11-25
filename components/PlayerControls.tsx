import { ViewStyle,StyleSheet } from "react-native"
import TrackPlayer, { useIsPlaying } from "react-native-track-player"
import {View} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";
type playerControlsProps={
    style?:ViewStyle
}

type playerButtonProps={
    style?:ViewStyle,
    iconSize?: number
}

export const PlayPauseButton = ({style,iconSize}:playerButtonProps)=>{
    const {playing} = useIsPlaying();

    return (
        <View style={[{height:iconSize},style]}>
            <TouchableOpacity activeOpacity={0.85} onPress={playing? TrackPlayer.pause : TrackPlayer.play}>
                <FontAwesome6 name={playing?'pause':'play'} size={iconSize} color={colors.text}/>
            </TouchableOpacity>
        </View>
    )
}

export const SkipToNextButton = ({iconSize=30}:playerButtonProps) =>{
    return(
        <TouchableOpacity activeOpacity={0.7} onPress={()=>TrackPlayer.skipToNext()}>
            <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
        </TouchableOpacity>
    )
}

export const SkipToPreviousButton = ({iconSize=30}:playerButtonProps) =>{
    return(
        <TouchableOpacity activeOpacity={0.7} onPress={()=>TrackPlayer.skipToPrevious()}>
            <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
        </TouchableOpacity>
    )
}

export const PlayerControls=({style}:playerControlsProps) => {
    return(
        <View style={[style, styles.container]}>
            <View style={styles.row}>
                <SkipToPreviousButton />
                <PlayPauseButton iconSize={35}/>
                <SkipToNextButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    }
})