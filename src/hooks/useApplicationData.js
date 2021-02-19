import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const getDay = (state, id, appointments) => {
  const days = [...state.days]

  const dayIndex = days.findIndex(day => day.appointments.includes(id))

  let spots = 0;

  days[dayIndex].appointments.forEach(appointment => {
    if (!appointments[appointment].interview) {
      spots += 1
    }
  })

  days[dayIndex].spots = spots

  return days
}

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }

    case SET_APPLICATION_DATA: {
      const { days, appointments, interviewers } = action

      return { ...state, days, appointments, interviewers }
    }

    case SET_INTERVIEW:
      const { id, interview } = action

      const appointment = {
        ...state.appointments[id],
        interview: interview
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = getDay(state, id, appointments)

      return { ...state, appointments, days }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(([days, appointments, interviewers]) => {
        dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data })
      })
      .catch(err => console.error(err))

    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

    webSocket.onopen = () => {
      webSocket.send("ping")

      webSocket.onmessage = (event) => {
        console.log(event.data)

        const { type, id, interview } = JSON.parse(event.data)

        if (type) {
          dispatch({ type, id, interview })
        }
      }
    }
  }, [])

  const setDay = (day) => {
    dispatch({ type: SET_DAY, day })
  }

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null })
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}

