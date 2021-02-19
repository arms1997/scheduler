import React, { useState, useEffect } from "react";

import "./styles.scss"

import Header from "./Header.jsx"
import Show from "./Show.jsx"
import Empty from "./Empty.jsx"
import Form from "./Form.jsx"
import Status from "./Status.jsx"
import Confirm from "./Confirm.jsx"
import Error from "./Error.jsx"

import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const CONFIRM = "CONFIRM"
  const ERROR = "ERROR"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
     }
     if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
     }
  }, [props.interview, transition, mode])

  const save = (name, interviewer) => {
    setMessage("Saving")
    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    }

    props.bookInterview(props.id, interview)
      .then((res) => transition(SHOW))
      .catch((err) => {
        setMessage("Was not able to save interview ")
        transition(ERROR, true)
      })
  }

  const confirm = () => {
    setMessage("Are you sure you want to Delete?")
    transition(CONFIRM)
  }

  const deleteData = () => {
    setMessage("Deleting")
    transition(SAVING, true)

    props.cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      .catch((err) => {
        setMessage("Was not able to cancel interview ")
        transition(ERROR, true)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        onEdit={() => transition(CREATE)}
      />}
      {mode === CREATE && 
      <Form 
        name={props.interview ? props.interview.student: null}
        value={props.interview ? props.interview.interviewer.id: null}
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel={back} 
      />}
      {mode === SAVING && <Status message={message} />}
      {mode === CONFIRM && <Confirm message={message} onConfirm={deleteData} onCancel={back} />}
      {mode === ERROR && <Error message={message} onClose={back}/>}

    </article>
  )
}