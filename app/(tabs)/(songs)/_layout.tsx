import { StackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/tokens";
import { defaultStyle } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

const SongsScreenLayout = () =>{
    return(
        <View style={defaultStyle.container}>
            <Stack>
                <Stack.Screen name="index" options={{...StackScreenWithSearchBar,headerTitle:"Songs" }}/>
            </Stack>
        </View>
    )
}

export default SongsScreenLayout;