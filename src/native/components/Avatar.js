import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../native-base-theme/variables/commonColor';

const DEFAULT_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/kickstarter-kit.appspot.com/o/unicorn.png?alt=media&token=0c788c56-51b2-43a6-84eb-ff1f4c0a147a';

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: Colors.brandLight,
  },
});

class Avatar extends Component {
  static propTypes = {
    picture: PropTypes.string,
  }

  static defaultProps = {
    picture: DEFAULT_AVATAR,
  }

  constructor(props) {
    super(props);
    const { picture } = this.props;
    this.state = {
      picture,
    };
  }

  handleOnError() {
    this.setState({
      picture: DEFAULT_AVATAR,
    });
  }

  render() {
    const { picture } = this.state;
    const { avatarStyle } = this.props;
    return (
      <Image {...this.props} style={[avatarStyle, styles.avatar]} source={{ uri: picture }} />
    );
  }
}

export default Avatar;
