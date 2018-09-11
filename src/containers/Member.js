import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMemberData } from '../actions/member';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => {
    const { fetchData } = this.props;
    fetchData();
  }

  render = () => {
    const { Layout, member } = this.props;

    return <Layout member={member} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  fetchData: getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
