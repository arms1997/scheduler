import React, { Fragment }from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

//Button -------------- Stories
import Button from "components/Button.jsx";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));



//DayListItem -------------- Stories
import DayListItem from "components/DayListItem.jsx";

storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));


//DayList -------------- Stories
import DayList from "components/DayList.jsx";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));


//InterviewerListItem -------------- Stories
import InterviewerListItem from "components/InterviewerListItem.jsx";

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
}

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem interviewer={interviewer} />
  ))
  .add("Selected", () => (
    <InterviewerListItem interviewer={interviewer} selected />
  ))
  .add("Clickable", () => (
    <InterviewerListItem interviewer={interviewer} setInterviewer={event => action("setInterviewer")(interviewer.id)} />
  ))


//InterviewerList -------------- Stories
import InterviewerList from "components/InterviewerList.jsx"

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("setInterviewer")}
    />
  ));

//Appointment -------------- Stories
import Appointment from "components/Appointment"
import Header from "components/Appointment/Header.jsx"
import Empty from "components/Appointment/Empty.jsx"
import Show from "components/Appointment/Show.jsx"
import Confirm from "components/Appointment/Confirm.jsx"
import Status from "components/Appointment/Status.jsx"
import Error from "components/Appointment/Error.jsx"
import Form from "components/Appointment/Form.jsx"

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => <Show 
                        student="Armeen Hadizadeh" 
                        interviewer={{ name: "Sylvia Palmer" }} 
                        onEdit={action("onEdit")} 
                        onDelete={action("onDelete")} 
                      />)
  .add("Confirm", () => <Confirm 
                          message="Delete the Appointment?" 
                          onConfirm={action("onConfirm")}
                          onCancel={action("onCancel")}
                        />)
  .add("Status", () => <Status message="Deleting"/>)
  .add("Error", () => <Error 
                        message="Could not delete appointment." 
                        onClose={action("onClose")}
                      />)
  .add("Edit Form", () => <Form name="Armeen Hadizadeh" onChange={action("setInterviewer")} interviewers={interviewers} value={3} onSave={action("onSave")} onCancel={action("onCancel")}/>)
  .add("Create Form", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm"/>
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment 
        id={1}
        time="12pm"
        interview={{student: "Lydia Miller-Jones", interviewer}}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))