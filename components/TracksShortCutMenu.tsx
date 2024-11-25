import { useFavorites } from "@/store/library"
import { useQueue } from "@/store/queue"
import { MenuView } from "@react-native-menu/menu"
import { useRouter } from "expo-router"
import { PropsWithChildren } from "react"
import TrackPlayer, { Track } from "react-native-track-player"
import { match } from 'ts-pattern'

type TrackShortCutsMenuProps = PropsWithChildren<{track:Track}>

export const TracksShortCutMenu = ({track,children}:TrackShortCutsMenuProps) =>{
    const router=useRouter();
    const isFavourite= track.rating === 1

    const {toggleTrackFavourite} = useFavorites()
    const {activeQueueId} = useQueue();

    const handlePressAction = (id:string) => {
        match(id)
        .with('add-to-favourite', async()=>{
            toggleTrackFavourite(track)

            if(activeQueueId?.startsWith('favourites')){
                await TrackPlayer.add(track)
            }
        })
        .with('remove-from-favourites',async()=>{
            toggleTrackFavourite(track);

            // If rack is in favourite list then we need to remove it.
            if(activeQueueId?.startsWith('favourites')){
                const queue = await TrackPlayer.getQueue();

                const trackToRemove = queue.findIndex(queueTrack => queueTrack.url === track.url)

                await TrackPlayer.remove(trackToRemove);
            }
        })

        .with('add-to-playlist',()=>{
            router.push({pathname: '/(modals)/addToPlayList' , params: {trackUrl : track.url }})
        })
        .otherwise(() => console.warn(`unknown menu action ${id}`))
    }
    return(
        <MenuView 
        onPressAction={({nativeEvent: {event}})=> handlePressAction(event)}
        actions={[
            {
                id: isFavourite ? 'remove-from-favourites' :'add-to-favourite',
                title: isFavourite ? 'Remove from favourites' : 'Add to favourites',
                image: isFavourite ? 'star.fill' : 'star'
            },
            {
            id:'add-to-playlist',
            title:"Add to playlist",
            image:'plus'
            }
        ]}>{children}</MenuView>
    )
}