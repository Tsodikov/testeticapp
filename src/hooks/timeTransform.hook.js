export const useTimeTransform = () => {
    const timeInterval = (date1, date2) => {
        const hours = Math.floor((new Date(date2).getTime()-new Date(date1).getTime())/1000 / 3600);
        const minutes = Math.floor(((new Date(date2).getTime()-new Date(date1).getTime())/1000 - (hours * 3600)) / 60);
        const seconds = Math.floor((new Date(date2).getTime()-new Date(date1).getTime())/1000 - (hours * 3600) - (minutes * 60));
        return hours.toString().padStart(2, '0') + ':' + 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
    }

    const averageTime = (dateArr) => {
        let sum = 0;
        let timeArr = dateArr.map(item => {
            return (new Date(item.dateEnd).getTime() - new Date(item.dateStart).getTime());
        });
        timeArr.forEach(item => {
            sum = sum + item;
        });
        let avg = sum/timeArr.length;
        const hours = Math.floor(avg / 1000 / 3600);
        const minutes = Math.floor((avg /1000 - (hours * 3600)) / 60);
        const seconds = Math.floor(avg /1000 - (hours * 3600) - (minutes * 60));
        return {
            avrgTimeString: hours.toString().padStart(2, '0') + ':' + 
                            minutes.toString().padStart(2, '0') + ':' + 
                            seconds.toString().padStart(2, '0'),
            avrgTimeS: Math.floor(avg/1000),
        }
    }

    return { timeInterval, averageTime };
}