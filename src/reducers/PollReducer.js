const initialState = {
  votes: [],
  fb: null,
  pollid: null,
  ltotal: '',
  topicId: '',
  city: '',
  curIndex: 0
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

    case "LVOTE_TOTAL":
      obj.topicId = action.topicId;
      return obj;

    case "RVOTE_TOTAL":
      obj.topicId = action.topicId;
      return obj;

    case "GET_CITY":
      obj.city = action.city;
      return obj;

    case "CHANGE_INDEX":
      obj.curIndex = action.curIndex;
      return obj;


    default:
      return state;
  }
}
