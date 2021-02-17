import React from "react";
import classNames from "classnames"

import "./styles/InterviewerListItem.scss"


export default function InterviewerListItem(props) {
  const interviewerItem = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li
      className={interviewerItem}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.interviewer.avatar}
        alt={props.interviewer.name}
      />
      {props.selected && props.interviewer.name}
    </li>
  )
}