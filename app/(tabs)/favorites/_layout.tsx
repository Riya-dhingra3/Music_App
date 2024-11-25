import { StackScreenWithSearchBar } from "@/constants/layout";
import { defaultStyle } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

const FavouriteScreenLayout = () =>{
    return(
        <View style={defaultStyle.container}>
            <Stack>
                <Stack.Screen name="index" options={{...StackScreenWithSearchBar,headerTitle:"Favourites"}}/>
            </Stack>
        </View>
    )
}

export default FavouriteScreenLayout;