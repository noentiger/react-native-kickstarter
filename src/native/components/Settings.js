import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';

import { getLanguageNameByLocale } from '../../i18n';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

class Settings extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    member: PropTypes.shape({}),
    logout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    member: {},
  }

  handleLogout = async () => {
    try {
      const { logout } = this.props;
      await logout();
      Actions.tabbar();
    } catch (e) {
      console.log(e);
    }
  }

  languageName() {
    const { locale } = this.props;
    return getLanguageNameByLocale(locale);
  }

  render() {
    const { loading, member } = this.props;
    if (loading) return <Loading />;
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            <ListItem itemHeader>
              <Text>Notifications</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button>
                  <Icon active name="ios-notifications" />
                </Button>
              </Left>
              <Body>
                <Text>Push messages</Text>
              </Body>
              <Right>
                <Switch value />
              </Right>
            </ListItem>
            <ListItem itemHeader>
              <Text>Account</Text>
            </ListItem>
            <ListItem icon onPress={() => Actions.locale()}>
              <Left>
                <Button>
                  <Icon active type="Entypo" name="language" />
                </Button>
              </Left>
              <Body>
                <Text>Language</Text>
              </Body>
              <Right>
                <Text>{this.languageName()}</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon onPress={() => this.handleLogout()}>
              <Left>
                <Button>
                  <Icon active name="ios-log-out" />
                </Button>
              </Left>
              <Body>
                <Text>Sign out</Text>
              </Body>
              <Right>
                <Text>{member.firstName}</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem itemHeader>
              <Text>About</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button>
                  <Icon active name="ios-mail" />
                </Button>
              </Left>
              <Body>
                <Text>Contact</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button>
                  <Icon active name="ios-document" />
                </Button>
              </Left>
              <Body>
                <Text>Privacy Policy</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Settings;
