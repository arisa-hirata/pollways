import { getFB } from "../components/firebase";




export function addVote(vote) {
  return {
    type: 'ADD_VOTE',
    taskName: vote
  }
}

export function ChangeFb(fb) {
  return {
    type: 'CHANGE_FB',
    fb: fb
  }
}


export function ChangePollID(pollid) {
  return {
    type: 'CHANGE_POLLID',
    pollid: pollid
  }
}

export function LVoteTotal(topicId) {

  console.log(topicId);

  // .then(querySnapshot => {
  //   console.log(querySnapshot);
  //   // Access all the documents in the collection
  //   const docs = querySnapshot.docs;
  //   // Loop through the documents
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //     const value = doc.data();
  //   })

  return {
    type: 'LVOTE_TOTAL',
    topicId: topicId,
  }

  //     }
  //   }

};

export function RVoteTotal(topiId) {
  return {
    type: 'RVOTE_TOTAL',
    topicId: topicId,
  }
}

export function GetCity(city) {
  return {
    type: 'GET_CITY',
    city: city
  }
}
