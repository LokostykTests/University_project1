import Head from "next/head"
import { useRouter } from "next/router"

import Background from "../components/Background/Background"
import GamePage from "../components/GamePage/GamePage"

const gameSite = () => {
    const router = useRouter()
    const { boardSize } = router.query
    const gridSize = Number(boardSize)

  return (
    <>
      <Head>
        <title>Memo - game</title>
      </Head>
      <Background>
          <GamePage gridSize={gridSize} />
      </Background>
    </>
  )
}

export default gameSite
