import { colors } from '@/constants/tokens'
import { Playist } from '@/helpers/types'
import { defaultStyle } from '@/styles'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'

type PlayListItemProps = {
	playlist: Playist
} & TouchableHighlightProps

export const PlayListItem = ({ playlist, ...props }: PlayListItemProps) => {
	return (
		<View style={{ flex: 1 }}>
			<TouchableHighlight activeOpacity={0.8} {...props}>
                <View style={styles.playlistItemContainer}>
				<View>
					<FastImage
						source={{
							uri: playlist.artworkPreview,
							priority: FastImage.priority.normal,
						}}
						style={styles.playListArtworkImage}
					/>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Text numberOfLines={1} style={styles.playListNameText}>
						{playlist.name}
					</Text>

					<AntDesign name="right" size={16} color={colors.icon} style={{ opacity: 0.5 }} />
				</View>
                </View>
			</TouchableHighlight>
		</View>
	)
}

const styles = StyleSheet.create({
	playlistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 90,
	},
	playListArtworkImage: {
		width: 70,
		height: 70,
		borderRadius: 8,
	},
	playListNameText: {
		...defaultStyle.text,
		fontSize: 17,
		fontWeight: '600',
		maxWidth: '80%',
	},
})
