import Head from 'next/head'
import Home from '../components/Home/Home'

export default function Main() {
  return (
    <>
      <Head>
        <title>Memo</title>
        <link rel="icon" href="/Icons/logo.svg" />
        <link rel="prefetch" href="https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400;500;600&display=swap" />
      </Head>
      <main>
        <Home />
      </main>
    </>
  )
}
