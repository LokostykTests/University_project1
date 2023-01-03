import { HTMLAttributes } from "react"
import styles from "./card.module.scss"

interface Props extends HTMLAttributes<HTMLDivElement> {
  cardId: number,
  children: React.ReactNode,
}

export default function Tile({ children, cardId, ...restProps }: Props) {
  return (
    <div className={styles.card} {...restProps}>
      <div className={styles.front}>
          {children}
      </div>
      <div className={styles.back}>

      </div>
    </div>
  )
}
