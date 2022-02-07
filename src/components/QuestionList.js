import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, [])

  function onAnswerChange(id, newValue) {
    console.log(id, newValue)
    fetch(`http://localhost:4000/questions/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": newValue
      })
    })
    .then(res => res.json())
    .then(newValue => {
      const newQuestArr = questions.map(question => {
        return question.id !== id ? question : newValue 
      })
      setQuestions([...newQuestArr])
    })
  }

  function onDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(() =>  {
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => 
        <QuestionItem 
          key={question.id} 
          question={question}
          onDeleteClick={onDeleteClick} 
          onAnswerChange={onAnswerChange}
          />)} 
      </ul>
    </section>
  );
}

export default QuestionList;
