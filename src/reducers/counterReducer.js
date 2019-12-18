const INITIALIZE_VALUE = 0;

export const counterReducer = (state = INITIALIZE_VALUE, action) => {
  switch (action.type) {
    case "UP":
      return state + 1;
    case "DOWN":
      return state - 1;
    default:
      return state;
  }
};
