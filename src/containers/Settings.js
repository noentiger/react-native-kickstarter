import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/member';

const Locale = ({
  Layout,
  locale,
  member,
  isLoading,
  errorMessage,
  memberLogout,
}) => (
  <Layout
    locale={locale}
    logout={memberLogout}
    member={member}
    loading={isLoading}
    error={errorMessage}
  />
);

Locale.propTypes = {
  Layout: PropTypes.func.isRequired,
  locale: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  member: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  memberLogout: PropTypes.func.isRequired,
};

Locale.defaultProps = {
  errorMessage: null,
  locale: null,
};

const mapStateToProps = state => ({
  locale: state.locale || null,
  member: state.member || null,
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  memberLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Locale);
