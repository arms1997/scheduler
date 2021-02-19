export function getAppointmentsForDay({ days, appointments }, day) {
  const filteredDay = days.find((dayInfo) => dayInfo.name === day)

  return filteredDay
    ? filteredDay.appointments.map((id) => appointments[id])
    : [];
}

export function getInterview({ days, appointments, interviewers }, interview) {
  return interview ?
    {
      student: interview.student,
      interviewer: { ...interviewers[interview.interviewer] }
    } :
    null
}

export function getInterviewersForDay({ days, interviewers }, day) {
  const filteredDay = days.find((dayInfo) => dayInfo.name === day)

  return filteredDay
    ? filteredDay.interviewers.map((id) => interviewers[id])
    : [];
}