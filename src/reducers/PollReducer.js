const initialState = {
  votes: []
};

export default function Votes(state = initialState, action) {
  let obj = Object.assign({}, state);

  switch (action.type) {
    case "CHANGE_GLOBAL_STATE":
      // same as setState
      obj.state1 = 1;
      return obj;

    case "ADD_VOTE":
      obj.tasks.push(action.taskName);
      obj.votes = obj.tasks.map((obj) => { return obj });
      return obj;

    default:
      return state;
  }
}
