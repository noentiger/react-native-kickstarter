import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
} from 'native-base';
import {
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';

import { Translations } from '../../i18n';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
});

class Locale extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onChangeLocale: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  handleChange = (locale) => {
    const { onChangeLocale } = this.props;
    onChangeLocale(locale)
      .then(() => Actions.pop())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, locale } = this.props;
    const listItems = Object.keys(Translations).map(key => (
      <ListItem key={key} selected={key === locale} onPress={() => this.handleChange(key)}>
        <Left>
          <Text>{Translations[key].name}</Text>
        </Left>
        <Right>
          <Radio
            color="#dddddd"
            selectedColor="#191919"
            selected={key === locale}
          />
        </Right>
      </ListItem>
    ));

    if (loading) return <Loading />;
    return (
      <Container style={styles.container}>
        {error && <Messages message={error} />}
        <Content>
          {listItems}
        </Content>
      </Container>
    );
  }
}

export default Locale;
