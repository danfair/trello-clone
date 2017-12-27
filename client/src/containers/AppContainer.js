import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';
import MainContainer from './MainContainer';

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
    boards: state.boards,
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(MainContainer);

export default App;