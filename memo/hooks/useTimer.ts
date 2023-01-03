import { useState, useEffect } from "react"

export default function useTimer(){
    const [time, setTime] = useState({seconds: "00", minutes: "00"})
    const [startTimer, setStartTimer] = useState(false)
    const [intervalId, setIntervalId] = useState<number>()

    useEffect(()=>{
        if(startTimer) {
            const currentIntervalId = setInterval(changeTime,1000)

            // @ts-ignore: setInterval return number but typescript does not recognize it
            setIntervalId(currentIntervalId)
        }else if(intervalId) {
            clearInterval(intervalId)
        }
    }, [startTimer])

    const changeTime = () => {
        setTime(prevTime=>{
            const seconds = Number(prevTime.seconds)
            const minutes = Number(prevTime.minutes)

            if(seconds === 59){
                return ({minutes: addZeroIfLessThanTen(minutes + 1), seconds: "00"})
            }

            return ({minutes: prevTime.minutes, seconds: addZeroIfLessThanTen(seconds + 1)})
        })
    }

    const addZeroIfLessThanTen = (num:number) => {
        if(num < 10) {
            return "0" + num
        }

        return String(num)
    }

    return {time, setStartTimer}
}