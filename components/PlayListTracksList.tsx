import { useNavigationsearch } from '@/hooks/useNavigationsearch'
import { TracksList } from './TracksList'
import { Playist } from '@/helpers/types'
import { trackTitleFilter } from '@/helpers/filter'
import { useMemo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { defaultStyle } from '@/styles'
import { fontSize } from '@/constants/tokens'
import FastImage from 'react-native-fast-image'
import { QueueControls } from './QueueControls'

export const PlayListTracksList = ({ playlist }: { playlist: Playist }) => {
	const { search, isFocused } = useNavigationsearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in PlayList',
		},
	})

	const FilteredPlayListTracks = useMemo(() => {
		return playlist.tracks.filter(trackTitleFilter(search))
	}, [search, playlist.tracks])
	return (
		<TracksList
			id={''}
			tracks={FilteredPlayListTracks}
			isFocused={false}
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.playListHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{ uri: playlist.artworkPreview, priority: FastImage.priority.high }}
							style={styles.artworkImage}
						/>
					</View>
					<Text numberOfLines={1} style={styles.playListNameText}>{playlist.name}</Text>

					{search.length === 0 && (
						<QueueControls tracks={playlist.tracks} style={{paddingTop:24}}/>
					)}
				</View>
			}
		/>
	)
}

const styles = StyleSheet.create({
	playListHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},

	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 300,
	},

	artworkImage: {
		width: '85%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	playListNameText: {
		...defaultStyle.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
