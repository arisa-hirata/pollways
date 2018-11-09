const initialState = {
  votes: [],
  fb: null,
  pollid: null
};

export default function Votes(state = initialState, action) {
  let obj = Object.assign({}, state);

  switch (action.type) {
    case "CHANGE_FB":
      // same as setState
      obj.fb = action.fb;
      return obj;

    case "ADD_VOTE":
      obj.tasks.push(action.taskName);
      obj.votes = obj.tasks.map((obj) => { return obj });
      return obj;

    case "CHANGE_POLLID":
      obj.pollid = action.pollid;
      return obj;



    default:
      return state;
  }
}
