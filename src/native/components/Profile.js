import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container, Content, List, ListItem, Body, Left, Text, Icon,
} from 'native-base';
import Header from './Header';

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
    console.log('member', member);
    return (
      <Container>
        <Content>
          <List>
            {(member && member.email)
              ? (
                <View>
                  <Content padder>
                    <Header
                      title={`Hi ${member.firstName},`}
                      content={`You are currently logged in as ${member.email}`}
                    />
                  </Content>

                  <ListItem onPress={Actions.updateProfile} icon>
                    <Left>
                      <Icon name="person-add" />
                    </Left>
                    <Body>
                      <Text>
                        Update My Profile
                      </Text>
                    </Body>
                  </ListItem>
                </View>
              )
              : (
                <View>
                  <Content padder>
                    <Header
                      title="Hi there,"
                      content="Please login to gain extra access"
                    />
                  </Content>

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
              )
            }
          </List>
        </Content>
      </Container>
    );
  }
}

export default Profile;
