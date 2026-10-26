import { useMemo, useState } from 'react'
import './App.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const WORDS = ['REACT', 'JAVASCRIPT', 'COMPONENT', 'BROWSER', 'FUNCTION', 'STYLING']
const MAX_MISSES = 6

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function HangmanFigure({ misses }) {
  const stage = Math.min(misses, MAX_MISSES)

  return (
    <figure className="hangman-figure">
      <img
        src={`/hangman-stage-${stage}.png`}
        alt={`Hangman illustration with ${stage} of ${MAX_MISSES} missed guesses`}
      />
      <figcaption>{MAX_MISSES - misses} {MAX_MISSES - misses === 1 ? 'life' : 'lives'} remaining</figcaption>
    </figure>
  )
}

function WordDisplay({ word, guessedLetters, gameOver }) {
  return (
    <div className="word-display" aria-label="Word to guess">
      {word.split('').map((letter, index) => {
        const isVisible = guessedLetters.includes(letter) || gameOver
        return (
          <span className={`word-letter ${isVisible ? 'is-visible' : ''}`} key={`${letter}-${index}`}>
            {isVisible ? letter : ''}
          </span>
        )
      })}
    </div>
  )
}

function LetterKeyboard({ guessedLetters, onGuess, disabled }) {
  return (
    <div className="keyboard" aria-label="Letter choices">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter)
        return (
          <button
            className={`letter-button ${isGuessed ? 'is-used' : ''}`}
            disabled={disabled || isGuessed}
            key={letter}
            onClick={() => onGuess(letter)}
            type="button"
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}

function GameStatusModal({ status, word, onNewGame }) {
  if (!status) return null

  const won = status === 'won'
  return (
    <div className="modal-backdrop" role="presentation">
      <section aria-labelledby="result-title" aria-modal="true" className="result-modal" role="dialog">
        <span className={`result-icon ${won ? 'is-win' : 'is-loss'}`} aria-hidden="true">
          {won ? '★' : '×'}
        </span>
        <p className="eyebrow">{won ? 'Great work' : 'Better luck next time'}</p>
        <h2 id="result-title">{won ? 'You got it!' : 'Game over'}</h2>
        <p>
          {won ? 'You found the word.' : <>The word was <strong>{word}</strong>.</>}
        </p>
        <button className="primary-button" onClick={onNewGame} type="button">
          Play again
        </button>
      </section>
    </div>
  )
}

function App() {
  const [word, setWord] = useState(getRandomWord)
  const [guessedLetters, setGuessedLetters] = useState([])

  const misses = useMemo(
    () => guessedLetters.filter((letter) => !word.includes(letter)).length,
    [guessedLetters, word],
  )
  const isWon = word.split('').every((letter) => guessedLetters.includes(letter))
  const isLost = misses >= MAX_MISSES
  const status = isWon ? 'won' : isLost ? 'lost' : null

  function guessLetter(letter) {
    if (status || guessedLetters.includes(letter)) return
    setGuessedLetters((current) => [...current, letter])
  }

  function startNewGame() {
    setWord((currentWord) => {
      const availableWords = WORDS.filter((candidate) => candidate !== currentWord)
      return availableWords[Math.floor(Math.random() * availableWords.length)]
    })
    setGuessedLetters([])
  }

  return (
    <main className="game-shell">
      <header className="game-header">
        <div>
          <p className="eyebrow">Classic word game</p>
          <h1>Hangman</h1>
        </div>
        <button className="new-game-button" onClick={startNewGame} type="button">
          <span aria-hidden="true">↻</span>
          New game
        </button>
      </header>

      <section className="game-card">
        <div className="game-intro">
          <div>
            <p className="eyebrow">Guess the hidden word</p>
            <h2>Choose a letter to play</h2>
          </div>
          <p className="miss-counter"><strong>{misses}</strong> / {MAX_MISSES} misses</p>
        </div>

        <div className="game-board">
          <HangmanFigure misses={misses} />
          <div className="play-area">
            <WordDisplay gameOver={Boolean(status)} guessedLetters={guessedLetters} word={word} />
            <p className="helper-text">
              {guessedLetters.length ? 'Keep going — you can do it!' : 'Pick a letter from the keyboard below.'}
            </p>
            <LetterKeyboard disabled={Boolean(status)} guessedLetters={guessedLetters} onGuess={guessLetter} />
          </div>
        </div>
      </section>

      <footer className="game-footer">
        <span className="footer-dot" aria-hidden="true" />
        <span>Every guess brings you closer</span>
      </footer>

      <GameStatusModal onNewGame={startNewGame} status={status} word={word} />
    </main>
  )
}

export default App
