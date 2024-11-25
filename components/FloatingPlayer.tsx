import { unkownTrackImageuri } from "@/constants/image";
import { StyleSheet } from "react-native";
import { TouchableOpacity, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { Track, useActiveTrack } from "react-native-track-player";
import { View, Text } from "react-native";
import { defaultStyle } from "@/styles";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";
import { uselastActiveTrack } from "@/hooks/useLastActiveTrack";
import { MovingText } from "./MovingText";
import { useRouter } from "expo-router";

export const FloatingPlayer = ({ style }: ViewProps) => {
    const router = useRouter();
    const activeTrack = useActiveTrack();
    const lastActiveTrack = uselastActiveTrack();

    const displayedTrack = activeTrack ?? lastActiveTrack;

    if (!displayedTrack) {
        return null;
    }

    const handlePress = () => {
        router.navigate('/Player');
    }

    return (
        <View style={[styles.container, style]}>
            {/* Only the artwork and title will be touchable */}
            <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={styles.touchable}>
                <FastImage
                    source={{
                        uri: displayedTrack.artwork ?? unkownTrackImageuri,
                    }}
                    style={styles.trackArtworkImage}
                />
                <View style={styles.trackTitleContainer}>
                    <MovingText style={styles.trackTitle} text={displayedTrack.title ?? ''} animationThreshold={25} />
                </View>
            </TouchableOpacity>

            {/* Control buttons are outside of the TouchableOpacity */}
            <View style={styles.tracksControlContainer}>
                <PlayPauseButton iconSize={24} />
                <SkipToNextButton iconSize={22} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Ensures it takes up remaining space
    },
    trackArtworkImage: {
        width: 40,
        height: 40,
        borderRadius: 8
    },
    trackTitle: {
        ...defaultStyle.text,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 10
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: 10
    },
    tracksControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16
    }
})
