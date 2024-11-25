import { MovingText } from "@/components/MovingText"
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar"
import { PlayerControls } from "@/components/PlayerControls"
import { PlayerProgressBar } from "@/components/PlayerProgressBar"
import { PlayerRepeatToggle } from "@/components/PlayerRepeatToggle"
import { unkownTrackImageuri } from "@/constants/image"
import { colors, fontSize, screenPadding } from "@/constants/tokens"
import { defaultStyle, utilsStyles } from "@/styles"
import { FontAwesome } from "@expo/vector-icons"
import { View ,StyleSheet, ActivityIndicator,Text} from "react-native"
import FastImage from "react-native-fast-image"
import { jsiConfigureProps } from "react-native-reanimated/lib/typescript/reanimated2/core"
import { SafeAreaInsetsContext, useSafeAreaInsets } from "react-native-safe-area-context"
import { useActiveTrack, useTrackPlayerEvents } from "react-native-track-player"
import { act } from "react-test-renderer"
// import { usePlayerBackground } from "@/hooks/usePlayerBackground"
import { LinearGradient } from "expo-linear-gradient"
import { useTrackPlayerFavourite } from "@/hooks/useTrackPlayerFavourite"
const PlayerScreen = () => {
    const activeTrack = useActiveTrack();
    // const {imageColors}=usePlayerBackground(activeTrack?.artwork ?? unkownTrackImageuri)
    const {top,bottom} =useSafeAreaInsets();

    const {isFavourite, toggleFavourite} = useTrackPlayerFavourite();
    
    if(!activeTrack){
        return(
            <View style={[defaultStyle.container , {justifyContent:'center'}]}>
                <ActivityIndicator color={colors.icon}/>
            </View>
        )
    }
    return(
        // <LinearGradient style={{flex:1}} colors={imageColors ? [imageColors.background, imageColors.primary] : [colors.background]}>
        <LinearGradient style={{flex:1}} colors={[colors.background]}>
        <View style={styles.overLayContainer}>
            <DismissPlayerSymbol />
            <View style={{flex:1 ,marginTop: top+70 , marginBottom:bottom }}>
                <View style={styles.artworkImageContainer}>
                <FastImage source={{
                    uri:activeTrack.artwork ?? unkownTrackImageuri,
                    priority: FastImage.priority.high,
                }}
                resizeMode="cover" style={styles.artworkImage}
                />
                </View>

                <View style={{flex:1}}>
                    <View style={{marginTop:'auto'}}>
                        <View style={{height:60}}>
                            <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
                                <View style={styles.trackTitleTextContainer}>
                                    <MovingText text={activeTrack.title ?? ''} animationThreshold={30} style={styles.trackTitletext}></MovingText>
                                </View>

                                {/* favourite icon */}
                                <FontAwesome name={isFavourite ? 'heart' :'heart-o'} size={20} color={isFavourite?colors.primary:colors.icon} style={{marginHorizontal:14}} onPress={toggleFavourite}/>
                            </View>

                            {/* Track Artist */}
                            {activeTrack.artist && (
                                <Text numberOfLines={1} style={[styles.trackArtistText , {marginTop: 6}]}>
                                    {activeTrack.artist}
                                </Text>
                            )}
                        </View>
                        <PlayerProgressBar style={{marginTop: 32}} />
                        <PlayerControls style={{marginTop: 40}} />
                    </View>
                    <PlayerVolumeBar style={{marginTop: 'auto', marginBottom: 30}}/>
                    <View style={utilsStyles.centeredRow}>
                        <PlayerRepeatToggle size={30} style={{marginBottom:6}} />
                    </View>
                </View>
            </View>
        </View>
        </LinearGradient>
    )
} 
export default PlayerScreen
const DismissPlayerSymbol = () =>{
    const {top} = useSafeAreaInsets();

    return(
        <View style={{position:'absolute', top:top + 20 , left:0 , right:0 , flexDirection: 'row', justifyContent:'center'}}>
            <View accessible={false} style={{width:50, height:8 , borderRadius: 8, backgroundColor: '#fff', opacity: 0.7}}></View>
        </View>
    )
}
const styles= StyleSheet.create({
    overLayContainer:{
        ...defaultStyle.container,
        paddingHorizontal:screenPadding.horizontal,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    artworkImageContainer:{
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.44,
        shadowRadius:11.0,
        flexDirection:'row',
        justifyContent:'center',
        height: '45%'
    },
    artworkImage:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius: 12
    },
    trackTitleTextContainer:{
        flex:1,
        overflow:'hidden'
    },
    trackTitletext:{
        ...defaultStyle.text,
        fontSize: 22,
        fontWeight: '700'
    },
    trackArtistText:{
        ...defaultStyle.text,
        fontSize: fontSize.base,
        opacity: 0.8,
        maxWidth: '80%'
    }
})