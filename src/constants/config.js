const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Kickstarter Kit',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-124032755-1' : 'UA-124032755-1',
};
