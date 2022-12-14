import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import TriviaApiService from '../../services/TriviaApiService';
import FlashcardList from '../FlashcardList/FlashcardList';

import './App.css'

function App() {

  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    new TriviaApiService().fetchAllCategories(res => setCategories(res.data.trivia_categories))
  }, [])

  useEffect(() => {
    new TriviaApiService().fetchQuestions({
      amount: 10
    }, res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = questionItem.correct_answer;
        const options = decodeStrings([...questionItem.incorrect_answers, answer])
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [flashcards])

  function decodeString(str) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value
  }

  function decodeStrings(strs) {
    return strs.map(str => decodeString(str))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amountRef.current.value,
        category: categoryRef.current.value
      }
    })
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = questionItem.correct_answer;
          const options = [...questionItem.incorrect_answers, answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
  }

  return (
    <div className="container">
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryRef}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Number of questions</label>
          <input type="number" ref={amountRef} min={1} step={1} defaultValue={10} />
        </div>

        <button type="submit" className="generate-button">Generate</button>
      </form>
      <div className="flashcards-content">
        <FlashcardList flashcards={flashcards} />
      </div>

      { loading && <div className="loader-frame">
        <div className="loader"></div>
      </div>
      }
      
    </div>
  )
}

export default App
