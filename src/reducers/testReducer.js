const INITIALIZE_VALUE = {
  name: "thanh",
  age: 18,
  city: "HN"
};

export const testReducer = (state = INITIALIZE_VALUE, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        name: "Co Tit"
      };
    default:
      return state;
  }
};
