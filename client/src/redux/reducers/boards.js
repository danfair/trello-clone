function boards(state = [], action) {
  switch (action.type) {
    case 'ADD_BOARD':
      console.log("Adding a board!");
      // const i = action.index;
      return [
        ...state, // before the one we are updating
        action.board
      ]
    default:
      return state;
  }
}

export default boards;