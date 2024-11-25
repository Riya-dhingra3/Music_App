import unknown_artist from "../assets/unknown_artist.png";
import unknown_track from "../assets/unknown_track.png";
// The Image component from react-native is imported to use its utility method, resolveAssetSourc
import { Image } from "react-native";


// Image.resolveAssetSource(asset) is used to get information about an image asset, including its uri. When dealing with static assets in React Native, resolveAssetSource gives the exact URI path that can be used in various components or by external libraries that require a URI.
// .uri extracts the uri property from the resolved asset object, which is a string pointing to the image’s path.
export const unkownTrackImageuri=Image.resolveAssetSource(unknown_track).uri;
export const unkownArtistImageuri=Image.resolveAssetSource(unknown_artist).uri;