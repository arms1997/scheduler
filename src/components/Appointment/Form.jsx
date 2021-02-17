import React, { useState } from "react";

import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList.jsx"

export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.value || null)

  const handleInput = (event) => {
    setName(event.target.value)
  }

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={handleInput}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => {reset(); props.onCancel()}} danger>Cancel</Button>
          <Button onClick={props.onSave()} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}