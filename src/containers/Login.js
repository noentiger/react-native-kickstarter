import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login, loginWithAuthProvider } from '../actions/member';

const Login = ({
  Layout,
  onFormSubmit,
  member,
  locale,
  isLoading,
  infoMessage,
  errorMessage,
  successMessage,
  onLogin,
}) => (
  <Layout
    member={member}
    locale={locale}
    loading={isLoading}
    info={infoMessage}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
    onLogin={onLogin}
  />
);

Login.propTypes = {
  Layout: PropTypes.func.isRequired,
  locale: PropTypes.string,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

Login.defaultProps = {
  infoMessage: null,
  locale: null,
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  member: state.member || {},
  locale: state.locale || null,
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: login,
  onLogin: loginWithAuthProvider,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
