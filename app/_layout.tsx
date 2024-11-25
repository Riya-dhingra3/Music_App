import { colors } from '@/constants/tokens'
import { NavigationContainer } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SplashScreen } from 'expo-router'
import { setSetupTrackPlayer } from '@/hooks/useSetUpTrackPlayer'
import { useCallback } from 'react'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
// import { PlayerScreen } from './Player'
SplashScreen.preventAutoHideAsync()
const App = () => {
	useLogTrackPlayerState()

	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])
	setSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="Player"
				options={{
					headerShown: false,
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
				}}
			/>
			<Stack.Screen
				name="(modals)/addToPlayList"
				options={{
					presentation: 'modal',
					headerStyle: { backgroundColor: colors.background },
					headerTitle: 'Add to playlist',
					headerTitleStyle: { color: colors.text },
				}}
			/>
		</Stack>
	)
}

export default App
