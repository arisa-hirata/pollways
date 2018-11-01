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
