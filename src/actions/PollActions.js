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

export const LVoteTotal = (topicId) => {

  var docRef = getFB().firestore().collection('polls').doc(topicId);
  docRef.get().then(function (doc) {
    console.log(doc.data());
    let data = doc.data();
    // console.log(data.votesL);
    // console.log(data.votesR);
  })
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



//   getTotals = async () => {
//     var Ltotal = getFB().firestore().collection("polls").votesL;

//     Ltotal.get().then((snap) => {
//       snap.forEach((doc) => {
//         this.cdoc = doc;
//       })
//     })
