export function addVote(vote) {
  return {
    type: 'ADD_VOTE',
    taskName: vote
  }
}
