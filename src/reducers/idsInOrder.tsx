import * as _ from 'lodash'

const idsInOrder = (state = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_SONGS':
      return _.union(state, action.response.map(song => song.id));
    default:
      return state;
  }
};
export default idsInOrder;
