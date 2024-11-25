import { unkownArtistImageuri } from '@/constants/image'
import { screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationsearch } from '@/hooks/useNavigationsearch'
import { useArtists } from '@/store/library'
import { defaultStyle, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import { useMemo } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableHighlight } from 'react-native-gesture-handler'

const ArtistScreen = () => {
	const { search } = useNavigationsearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
		},
	})

	const artists = useArtists() || [] // Fallback to an empty array if undefined

	// Memoize filtered artists based on search input
	const filteredArtists = useMemo(() => {
		if (!search) return artists
		return artists.filter(artistNameFilter(search))
	}, [artists, search])

	// Separator Component
	const ItemSeparatorComponent = () => (
		<View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
	)

	// Render Artist Item
	const renderItem = ({ item: artist }: { item: { name: string } }) => (
		<Link href={`/artists/${artist.name}`} asChild>
			<TouchableHighlight activeOpacity={0.8}>
				<View style={styles.artistItemContainer}>
					{/* Artist Image */}
					<FastImage source={{ uri: unkownArtistImageuri }} style={styles.artistImage} />
					{/* Artist Name */}
					<View style={styles.artistNameContainer}>
						<Text numberOfLines={1} style={styles.artistNameText}>
							{artist.name}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		</Link>
	)

	return (
		<View style={defaultStyle.container}>
			<FlatList
				data={filteredArtists}
				contentContainerStyle={{
					paddingHorizontal: screenPadding.horizontal,
					paddingTop: 10,
					paddingBottom: 120,
				}}
				keyExtractor={(item) => item.name}
				ItemSeparatorComponent={ItemSeparatorComponent}
				ListEmptyComponent={
					<View style={{ alignItems: 'center', marginTop: 50 }}>
						<Text style={{ fontSize: 16, color: '#666' }}>No artist found</Text>
						<FastImage
							source={{ uri: unkownArtistImageuri, priority: FastImage.priority.normal }}
							style={[utilsStyles.emptyContentImage, { marginTop: 20 }]}
						/>
					</View>
				}
				renderItem={renderItem}
				ListHeaderComponent={<View style={{ height: 200 }}></View>}
			/>
		</View>
	)
}

export default ArtistScreen

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		alignItems: 'center', 
		paddingVertical: 10,
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
		marginRight: 14, 
	},
	artistNameContainer: {
		flex: 1, 
	},
	artistNameText: {
		...defaultStyle.text,
		fontSize: 17,
		maxWidth: '90%',
	},
})
