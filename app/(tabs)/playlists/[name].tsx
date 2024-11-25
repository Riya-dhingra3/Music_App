import { PlayListTracksList } from "@/components/PlayListTracksList";
import { screenPadding } from "@/constants/tokens";
import { usePlayList } from "@/store/library";
import { defaultStyle } from "@/styles";
import { Redirect, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

const PlayListScreen = () => {
  const { name: playListName } = useLocalSearchParams<{ name: string }>();
  const { playlist: playlists } = usePlayList();

  // Find the matching playlist by name
  const selectedPlaylist = playlists.find((playlist) => playlist.name === playListName);

  if (!selectedPlaylist) {
    console.warn(`Playlist ${playListName} was not found!`);
    return <Redirect href={'/(tabs)/playlists'} />;
  }

  return (
    <View style={defaultStyle.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        {/* Pass the selected playlist */}
        <PlayListTracksList playlist={selectedPlaylist} />
      </ScrollView>
    </View>
  );
};

export default PlayListScreen;
