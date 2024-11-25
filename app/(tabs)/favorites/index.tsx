import { defaultStyle } from '@/styles'
import { View, Text } from 'react-native'
import library from '@/assets/data/library.json'
import { TracksList } from '@/components/TracksList'
import { useMemo } from 'react'
import { useNavigationsearch } from '@/hooks/useNavigationsearch'
import { screenPadding } from '@/constants/tokens'
import { useFavorites } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/mischelaneous'
const FavouriteScreen = () => {
	const { search, isFocused } = useNavigationsearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const favourtiteTracks = useFavorites().favourites

	// const favourtiteTracks = useMemo(()=>{
	//     return library.filter(track => track.rating === 1)
	// },[])
	const filteredFavoritesTracks = useMemo(() => {
		if (!search) {
			return favourtiteTracks
		}
		return favourtiteTracks.filter(trackTitleFilter(search))
	}, [search, favourtiteTracks])

	return (
		<View style={[defaultStyle.container, { paddingHorizontal: screenPadding.horizontal }]}>
			<TracksList
				id={generateTrackListId('favorites', search)}
				tracks={filteredFavoritesTracks}
				isFocused={isFocused}
			/>
		</View>
	)
}

export default FavouriteScreen
