import React from "react";
import classes from "./ActiveQuiz.module.css"
import AnswersList from "./AnswersList/AnswersList";

const ActionQuiz = props =>(
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>1</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.answerNumber} of {props.quizLength}</small>
        </p>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state = {props.state}
        />

    </div>
)

export default ActionQuiz
