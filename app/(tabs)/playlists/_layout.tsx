import { StackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/tokens";
import { defaultStyle } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

const PlaylistScreenLayout = () =>{
    return(
        <View style={defaultStyle.container}>
            <Stack>
                <Stack.Screen name="index" options={{...StackScreenWithSearchBar,headerTitle:"PlayList"}}/>
                <Stack.Screen name="[name]" options={{headerTitle: '', headerBackVisible: true, headerStyle:{backgroundColor: colors.background}, headerTintColor: colors.primary}} />
            </Stack>
        </View>
    )
}

export default PlaylistScreenLayout;