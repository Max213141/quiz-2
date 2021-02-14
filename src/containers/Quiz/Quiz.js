import React, {Component} from 'react'
import classes from './Quiz..module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"

class Quiz extends Component {
    state={
        quiz: [
            {
                question: 'What color is u',
                rightAnswerId: 2,
                id:1,
                answers:[
                    {text: 'A', id:1},
                    {text: 'B', id:2},
                    {text: 'C', id:3},
                    {text: 'D', id:4},
                ],

            },
            {
                question: 'What color is ur friend',
                rightAnswerId: 1,
                id:2,
                answers:[
                    {text: 'A', id:1},
                    {text: 'B', id:2},
                    {text: 'C', id:3},
                    {text: 'D', id:4},
                ],

            },
        ],
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false

    }

    onAnswerClickHandler = (answerId) =>{
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key]==='success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId){
            if(!results[answerId]){
                results[answerId] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(()=>{
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished:true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion+1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            },1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () =>{
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    render() {
        return (
            <div className={classes.Quiz}>



                <div className={classes.QuizWrapper}>
                    <h1>Answer all questions</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz ={this.state.quiz}
                            onRetry={this.retryHandler}
                          />
                        : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion+1}
                                state ={this.state.answerState}
                          />

                    }
                </div>
            </div>
        )
    }
}

export default Quiz
