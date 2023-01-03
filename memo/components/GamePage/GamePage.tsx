import styles from "./gamePage.module.scss"
import cardStyles from "../Card/card.module.scss"
import React, { useEffect, useState } from "react"

import Button from "../Button/Button"
import Tile from "../Card/Card"
import { getRandomNumber } from "../../utils/getRandomNumber"
import LinkButton from "../Button/LinkButton"
import useTimer from "../../hooks/useTimer"

interface Props {
  gridSize?: number,
}

interface chosenCard {
  cardId: number,
  classList: DOMTokenList
}

export default function GamePage({ gridSize = 0 }: Props) {
  const [board, setBoard] = useState<number[]>([])
  const [chosenCard, setChosenCard] = useState<chosenCard>({cardId: -1} as  chosenCard)
  const [cardsFlip, setCardsFlip] = useState(false)
  const [movesCounter, setMovesCounter] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const {time, setStartTimer} = useTimer()

  //Create board when page loads
  useEffect(()=>{
    const board = createBoard(gridSize)

    setBoard(board)
  },[gridSize])

  //Show vicotory screen
  useEffect(()=>{
    if(gameOver){
      setStartTimer(false)
      setGameOver(false)

      alert(`Victory!!\nCzas:${time.minutes}:${time.seconds}\nRuchy:${movesCounter}`)
    }
  },[gameOver])

  const createBoard = (size:number) => {
    const numberOfAllTiles = size * size
    const board = []

    for(let i = 1; i <= numberOfAllTiles / 2; i++){
      board.push(i)
      board.push(i)
    }

    return shuffleBoard(board)
  }

  const shuffleBoard = (board:number[]) => {
    const boardSize = board.length
    const shuffledBoard = [...board]

    for(let i = 0; i < boardSize; i++) {
      let randomNumber = 0;

      do {
        randomNumber = getRandomNumber(1, boardSize - 1)
      }while(randomNumber === i)

      const baseNumber = Number(shuffledBoard[i])
      const swapNumber = Number(shuffledBoard[randomNumber])

      shuffledBoard[i] = swapNumber
      shuffledBoard[randomNumber] = baseNumber
    }

    return shuffledBoard
  }

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const currentElement = e.currentTarget
    const oneCardChosen = !!chosenCard.classList
    const cardsAreIdentical = chosenCard.cardId === cardId

    if(currentElement.classList.contains(cardStyles.active) || cardsFlip) return
    setMovesCounter(prevState=> prevState + 1)
    setStartTimer(true)
    currentElement.classList.add(cardStyles.active)


    if(oneCardChosen) {
      setCardsFlip(true)
      
      if(cardsAreIdentical) {
        setTimeout(()=>{
          currentElement.classList.add(cardStyles.deactivate)
          chosenCard.classList.add(cardStyles.deactivate)

          checkGameState()
        },600)
          
        setCardsFlip(false)
      }else {
        setTimeout(()=>{
          currentElement.classList.remove(cardStyles.active)
          chosenCard.classList.remove(cardStyles.active)

          setCardsFlip(false)
        },1000)
      }
          
      setChosenCard({cardId: -1} as chosenCard)
    }else {
      setChosenCard({ cardId, classList: currentElement.classList})
    }

  }

  const checkGameState = () => {
    const allDiscoveredCards = document.getElementsByClassName(cardStyles.deactivate)
    const allCardsPaired = allDiscoveredCards.length === board.length

    if(allCardsPaired) {
      setTimeout(()=>{
        setGameOver(true)
      },600)
    }
  }

  return (
      <div>
        <div className={styles.topBar}>
          <LinkButton href="/" contentType="image">
            <img src="/Icons/go_back.png" />
          </LinkButton>
          <p className={styles.smallContainer}>{time.minutes}:{time.seconds}</p>
          <p className={styles.smallContainer}>Ruchy {movesCounter}</p>
          <Button contentType="image" onClick={()=> window.location.reload()}>
            <img src="\Icons\restart.png"/>
          </Button>
        </div>        
        <div 
          className={styles.board} 
          style={{gridTemplate: `repeat(${gridSize}, auto) / repeat(${gridSize}, auto)`}}>
          {board.map((id, index)=>{
            return (
              <Tile cardId={id} key={index} onClick={(e)=>handleCardClick(e, id)}>
                <img src={`/Images/emoji_${id}.svg`} draggable="false" />
              </Tile>
            )
          })}
        </div>
      </div>
  )
}
