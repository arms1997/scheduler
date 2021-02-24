export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const getDay = (state, id, appointments) => {
  const days = [...state.days];

  const dayIndex = days.findIndex((day) => day.appointments.includes(id));

  let spots = 0;

  days[dayIndex].appointments.forEach((appointment) => {
    if (!appointments[appointment].interview) {
      spots += 1;
    }
  });

  days[dayIndex].spots = spots;

  return days;
};

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };

    case SET_APPLICATION_DATA: {
      const { days, appointments, interviewers } = action;

      return { ...state, days, appointments, interviewers };
    }

    case SET_INTERVIEW:
      const { id, interview } = action;

      const appointment = {
        ...state.appointments[id],
        interview: interview,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      const days = getDay(state, id, appointments);

      return { ...state, appointments, days };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
