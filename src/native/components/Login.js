import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Form, Item, Label, Input, Text, Button, View, Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { LoginManager } from 'react-native-fbsdk';
import Loading from './Loading';
import Messages from './Messages';
import { translate } from '../../i18n';
import Header from './Header';
import Spacer from './Spacer';

const socialColors = {
  facebook: '#3B5998',
};

class Login extends Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    locale: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    locale: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then( async () => {

        Actions.tabbar();

        const enabled = await firebase.messaging().hasPermission();
        if (!enabled) {
          try {
              await firebase.messaging().requestPermission();
              // User has authorised
          } catch (error) {
              // User has rejected permissions
          }
        }
      })
      .catch(e => console.log(`Error: ${e}`));
  }

  handleLoginWithFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          console.log('Login was successful with permissions: '
            + result.grantedPermissions.toString());
          console.log("result", result);
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  render() {
    const { loading, error, locale } = this.props;
    const { email } = this.state;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content>
          <View padder>
            <Header
              title="Welcome back"
              content="Please use your email and password to login."
            />

            {error && <Messages message={error} />}
          </View>

          <Form>
            <Item stackedLabel>
              <Label>
                {translate('Email', locale)}
              </Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>
                {translate('Password', locale)}
              </Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Button block onPress={this.handleSubmit}>
                <Text>
                  {translate('Login', locale)}
                </Text>
              </Button>
              <Spacer size={5} />
              <Button style={{backgroundColor:socialColors.facebook}} iconLeft primary block onPress={this.handleLoginWithFacebook}>
                <Icon name="logo-facebook" />
                <Text>
                  {translate('Login With Facebook', locale)}
                </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
