import React from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { View, StyleSheet, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { unkownTrackImageuri } from '@/constants/image'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyle } from '@/styles'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Entypo, Ionicons } from '@expo/vector-icons'
import LoaderKit from 'react-native-loader-kit'
import { TracksShortCutMenu } from './TracksShortCutMenu'
import { StopPropagation } from './utils/StopPropagation'

export type TrackListItemProps = {
	track: Track
	onTrackSelect: (track: Track) => void
}

function TrackListItem({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) {
	const isActiveTrack = useActiveTrack()?.url === track.url
	const { playing } = useIsPlaying()
	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={{ ...style.trackItemContainer }}>
				{/* fast loading and rendering It leverages a custom native image caching library on both iOS and Android, which caches images locally on the device. This makes FastImage significantly faster, especially when the same image is loaded multiple times */}
				{/* Automatically caches images (both in memory and on disk) so that frequently accessed images load faster. It provides three levels of caching:
                    FastImage.cacheControl.web: Uses web caching headers.
                    FastImage.cacheControl.cacheOnly: Only uses the cache, without making network requests.
                    FastImage.cacheControl.immutable: Caches the image indefinitely. */}
				{/* Supports setting loading priority (FastImage.priority.low, FastImage.priority.normal, FastImage.priority.high). This is helpful when you want certain images to load before others, like a profile picture over a background image */}
				<FastImage
					source={{
						uri: track.artwork ?? unkownTrackImageuri,
						priority: FastImage.priority.normal,
					}}
					style={{ ...style.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }}
				/>

				{isActiveTrack &&
					(playing ? (
						<LoaderKit
							style={style.trackPlayingIconIndicator}
							name="LineScaleParty"
							color={colors.icon}
						/>
					) : (
						<Ionicons style={style.trackPauseIndicator} name="play" size={24} color={colors.icon} />
					))}
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '100%', marginLeft: 2 }}>
						<Text
							numberOfLines={1}
							style={{
								...style.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{track.title}
						</Text>
						{track.artist && (
							<Text numberOfLines={1} style={style.trackArtistText}>
								{track.artist}
							</Text>
						)}
					</View>

					<StopPropagation>
					<TracksShortCutMenu track={track}>
						<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
					</TracksShortCutMenu>
					</StopPropagation>
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default TrackListItem

const style = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyle.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyle.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		left: 16,
		width: 16,
		height: 16,
	},
	trackPauseIndicator: {
		position: 'absolute',
		left: 14,
		top: 14,
	},
})
