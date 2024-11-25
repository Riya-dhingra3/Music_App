import { colors, fontSize } from "@/constants/tokens";
import { formatSecondstoMinute } from "@/helpers/mischelaneous";
import { defaultStyle, utilsStyles } from "@/styles";
import { ViewProps,View,  Text, StyleSheet } from "react-native";
import {Slider } from "react-native-awesome-slider"
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";

export const PlayerProgressBar = ({style}:ViewProps) =>{
    const {duration,position}=useProgress(250)

    const isSliding= useSharedValue(false);
    const progress=useSharedValue(0);
    const min=useSharedValue(0);
    const max=useSharedValue(1);


    const trackElapsedTime = formatSecondstoMinute(position);
    const trackRemainingTime = formatSecondstoMinute(duration - position)

    if(!isSliding.value){
        progress.value = duration>0 ? position/duration : 0 ;
    }
    return(
        <View style={style}>
            <Slider 
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                containerStyle={utilsStyles.slider}
                // Removes the thumb (indicator on the slider).
                thumbWidth={0}
                // Disables the popup showing the current value when sliding.
                renderBubble={()=>null}
                theme={{
                    minimumTrackTintColor:colors.minimumTrackTintColor,
                    maximumTrackTintColor:colors.maximumTrackTintColor
                }}
                onSlidingStart={()=>(isSliding.value=true)}
                // allows for precise control over playback position based on the slider's normalized value.
                onValueChange={async(value)=>{await TrackPlayer.seekTo(value*duration)}}
                onSlidingComplete={async(value)=>{if(!isSliding.value){
                    return
                }
                isSliding.value=false

                await TrackPlayer.seekTo(value*duration)
            }}
            />

            <View style={styles.timeRow}>
                <Text style={styles.timeText}>
                    {trackElapsedTime}
                </Text >
                <Text style={styles.timeText}>
                    {'-'}{trackRemainingTime}
                </Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    timeText: {
        ...defaultStyle.text,
        color:colors.text,
        opacity:0.75,
        fontSize: fontSize.xs,
        letterSpacing: 0.7,
        fontWeight: '500'
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'baseline',
        marginTop:20
    }
})
// TrackPlayer.seek() what it does
// Normalized Progress Value:

// The slider's progress value (value) represents a normalized position between 0 and 1. This is because progress is calculated as position / duration in the code, where:
// position is the current playback position in seconds.
// duration is the total track length in seconds.
// This normalized value allows the slider to represent the entire track length without directly using the absolute playback time.
// Converting Normalized Value to Actual Position:

// To seek to a specific point in the track, you need an absolute time in seconds.
// By multiplying value (a normalized number between 0 and 1) with duration, you get the exact playback time in seconds where the user wants to seek. For example:
// If value is 0.5 and duration is 300 seconds, value * duration will be 150 seconds, which is the halfway point in the track.
// Seeking to the Calculated Position:

// TrackPlayer.seekTo() accepts a time in seconds and moves the playback to that position.
// This lets users control playback accurately by sliding to any point between the start and end of the track.
// Example Walkthrough
// If the track duration is 300 seconds (5 minutes):
// When value is 0.25 (25%), value * duration = 75 seconds, so seekTo(75) moves playback to 1 minute, 15 seconds.
// When value is 1 (100%), seekTo(duration) moves playback to the track's end.