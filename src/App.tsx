import styles from './App.module.scss'
import HomePage from "./pages/HomePage/HomePage.tsx";

function App() {

  return (
      <>
        <h1 className={styles.app__title}> Clarus Hospital</h1>
        <HomePage/>
      </>
  )
}

export default App
