import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container, Content, Icon, Button, Text, Body, H2, ListItem, Left,
} from 'native-base';

import Colors from '../../../native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.brandPrimary,
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
    backgroundColor: Colors.brandLight,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  about: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Profile extends Component {
  static propTypes = {
    member: PropTypes.shape({}),
  }

  static defaultProps = {
    member: {},
  }

  componentWillMount() {
    const { member } = this.props;
    if (member.isLoggedin) {
      Actions.refresh({ right: this.renderRightButton });
    }
  }

  renderRightButton = () => (
    <TouchableOpacity onPress={() => Actions.settings()} style={{ paddingRight: 10 }}>
      <Icon name="settings" />
    </TouchableOpacity>
  );

  render() {
    const { member } = this.props;
    const {
      picture, firstName, lastName, about, isLoggedin,
    } = member;
    return (
      <Container>
        {(isLoggedin)
          ? (
            <Content>
              <View style={styles.header} />
              <Image style={styles.avatar} source={{ uri: picture }} />
              <Body style={styles.body}>
                <Body style={styles.bodyContent}>
                  <H2 style={styles.name}>{`${firstName} ${lastName}`}</H2>
                  <Text style={styles.about}>
                    {about}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <Button rounded iconLeft onPress={Actions.updateProfile}>
                      <Text>Edit Profile</Text>
                    </Button>
                  </View>
                </Body>
              </Body>
            </Content>

          ) : (
            <Content>
              <View>
                <ListItem onPress={Actions.login} icon>
                  <Left>
                    <Icon name="power" />
                  </Left>
                  <Body>
                    <Text>
                      Login
                    </Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.signUp} icon>
                  <Left>
                    <Icon name="add-circle" />
                  </Left>
                  <Body>
                    <Text>
                      Sign Up
                    </Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.forgotPassword} icon>
                  <Left>
                    <Icon name="help-buoy" />
                  </Left>
                  <Body>
                    <Text>
                      Forgot Password
                    </Text>
                  </Body>
                </ListItem>
              </View>
            </Content>
          )}
      </Container>
    );
  }
}

export default Profile;
