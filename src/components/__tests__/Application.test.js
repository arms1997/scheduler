import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  getByDisplayValue,
} from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const monday = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    //1. Render the container for the Applciation
    const { container, debug } = render(<Application />);

    //2. Wait until the data has loaded for the application
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3. Get the appointment that we would like to cancel
    const archieAppointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    //4. Click on the garbage icon to cancel the appointment (GetByAltText)
    fireEvent.click(getByAltText(archieAppointment, "Delete"));

    //5. Check that the confirmation message is shown
    expect(
      getByText(archieAppointment, "Are you sure you want to Delete?")
    ).toBeInTheDocument();

    //6. Click the "Confirm" button on the confirmation screen
    fireEvent.click(getByText(archieAppointment, "Confirm"));

    //7. Expec the Deleting Message to be showing on the component
    expect(getByText(archieAppointment, "Deleting")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      getByText(archieAppointment, "Deleting")
    );

    //8. Once element has been removed expect the plus sign to return
    expect(getByAltText(archieAppointment, "Add")).toBeInTheDocument();

    //9. check that spots remaining for monday has increased by 1
    const monday = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(monday, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    //2. Wait until the data has loaded for the application
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3. Get the appointment that we would like to cancel
    const archieAppointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    //4. Click on the Edit Button
    fireEvent.click(getByAltText(archieAppointment, "Edit"));

    //5. Changes to the Form Component and shows Archie Cohen in the name spot
    expect(
      getByDisplayValue(archieAppointment, "Archie Cohen")
    ).toBeInTheDocument();

    //6. Change the Name to Lydia Miller-Jones
    fireEvent.change(
      getByPlaceholderText(archieAppointment, /enter student name/i),
      {
        target: { value: "Lydia Miller-Jones" },
      }
    );
    //7. Click Save
    fireEvent.click(getByText(archieAppointment, "Save"));

    //8. Shows Saving and then the Show Component
    expect(getByText(archieAppointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      getByText(archieAppointment, "Saving")
    );

    expect(
      getByText(archieAppointment, "Lydia Miller-Jones")
    ).toBeInTheDocument();

    //9. Same amount of spots available for Monday
    const monday = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
  });

  it("Shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(
      getByText(appointment, "Was not able to save interview")
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    //2. Wait until the data has loaded for the application
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //3. Get the appointment that we would like to cancel
    const archieAppointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    //4. Click on the garbage icon to cancel the appointment (GetByAltText)
    fireEvent.click(getByAltText(archieAppointment, "Delete"));

    //5. Check that the confirmation message is shown
    expect(
      getByText(archieAppointment, "Are you sure you want to Delete?")
    ).toBeInTheDocument();

    //6. Click the "Confirm" button on the confirmation screen
    fireEvent.click(getByText(archieAppointment, "Confirm"));

    //7. Expec the Deleting Message to be showing on the component
    expect(getByText(archieAppointment, "Deleting")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      getByText(archieAppointment, "Deleting")
    );

    expect(
      getByText(archieAppointment, "Was not able to cancel interview")
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(archieAppointment, "Close"));

    expect(getByText(archieAppointment, "Archie Cohen")).toBeInTheDocument();
  });
});
