import React from "react";

import InterviewerListItem from "./InterviewerListItem.jsx"
import "./styles/InterviewerList.scss"

export default function InterviewerList(props){

  const interviewerListItems = props.interviewers.map(interviewer => <InterviewerListItem 
      key={interviewer.id}
      interviewer={interviewer} 
      setInterviewer={(event) => props.onChange(interviewer.id)} 
      selected={props.value === interviewer.id} 
    />)

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  )
}