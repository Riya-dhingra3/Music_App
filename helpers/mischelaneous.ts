export const formatSecondstoMinute = (seconds:number) =>{
    const minutes=Math.floor(seconds / 60);
    const remianingSeconds= Math.floor( seconds % 60)

    const formatedMinutes = String(minutes).padStart(2,'0');
    const formatedSeconds = String(remianingSeconds).padStart(2,'0');

    return `${formatedMinutes}:${formatedSeconds}`
}

export const generateTrackListId = (trackListName: string , search?: string) => {
    return `${trackListName}${`-${search}` || ''}`
}