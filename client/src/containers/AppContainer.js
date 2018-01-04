import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

const AppContainer = connect(mapStateToProps, mapDispachToProps)(MainContainer);

export default withRouter(AppContainer);
// export default AppContainer;