import { unkownTrackImageuri } from "@/constants/image";
import { playListNameFilter } from "@/helpers/filter";
import { Playist } from "@/helpers/types";
import { useNavigationsearch } from "@/hooks/useNavigationsearch";
import { utilsStyles } from "@/styles";
import { useMemo } from "react";
import { FlatList, FlatListProps, View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { PlayListItem } from "./PlayListItem";

type PlayListProps = {
    playlist: Playist[]; // Renamed for clarity
  onPlayListPress: (playlist: Playist) => void;
} & Partial<FlatListProps<Playist>>;

export const PlaylistsList = ({
  playlist,
  onPlayListPress: handlePlayList,
  ...flatListProps
}: PlayListProps) => {
  const { search } = useNavigationsearch({
    searchBarOptions: {
      placeholder: "Find in Playlist",
    },
  });

  // Divider for items
  const ItemDivider = () => (
    <View
      style={{
        ...utilsStyles.itemSeparator,
        marginLeft: 80,
        marginVertical: 12,
      }}
    />
  );

  // Filter playlists based on search input
  const filteredPlaylists = useMemo(() => {
    return playlist.filter(playListNameFilter(search));
  }, [search, playlist]);

  return (
    <FlatList
      data={filteredPlaylists}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 128,
      }}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyComponentText}>No Playlist Found</Text>
          <FastImage
            source={{
              uri: unkownTrackImageuri,
              priority: FastImage.priority.normal,
            }}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      {...flatListProps}
      renderItem={({ item }) => (
        <PlayListItem playlist={item} onPress={() => handlePlayList(item)} />
      )}
    />
  );
};
