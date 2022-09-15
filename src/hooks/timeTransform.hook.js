export const useTimeTransform = () => {
    const timeInterval = (date1, date2) => {
        const hours = Math.floor((new Date(date2).getTime()-new Date(date1).getTime())/1000 / 3600);
        const minutes = Math.floor(((new Date(date2).getTime()-new Date(date1).getTime())/1000 - (hours * 3600)) / 60);
        const seconds = Math.floor((new Date(date2).getTime()-new Date(date1).getTime())/1000 - (hours * 3600) - (minutes * 60));
        return hours.toString().padStart(2, '0') + ':' + 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
    }

    return { timeInterval };
}