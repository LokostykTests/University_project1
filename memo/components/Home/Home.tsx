import styles from "./home.module.scss"
import LinkButton from "../Button/LinkButton"
import { ChangeEvent, useState } from "react"
import Background from "../Background/Background"

export default function Home() {
    const [boardSize, setBoardSize] = useState(2)

    const changeBoardSize = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value)

        setBoardSize(newSize)
    }

  return (
    <Background>
        <div className={styles.container}>
            <h2 className={styles.heading}>Memory game</h2>
            <select 
                className={styles.selectDrop}
                value={boardSize} 
                onChange={changeBoardSize}>
                <option>2</option>
                <option>4</option>
                <option>6</option>
            </select>
            <LinkButton href={`gameSite/${boardSize}`}>
                Start
            </LinkButton>
        </div>
    </Background>
  )
}
