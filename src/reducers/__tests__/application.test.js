import reducer, {
  SET_DAY,
  SET_INTERVIEW,
  SET_APPLICATION_DATA,
} from "../application";

describe("Application Reducer", () => {
  it("Throws an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});
