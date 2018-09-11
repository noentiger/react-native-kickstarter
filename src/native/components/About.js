import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import Spacer from './Spacer';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

const About = () => (
  <Container style={styles.container}>
    <Content padder>
      <Spacer size={30} />
      <H1>
        Heading 1
      </H1>
      <Spacer size={10} />
      <Text>
        Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
        tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
        malesuada magna mollis euismod. Donec sed odio dui.
        {' '}
      </Text>

      <Spacer size={30} />
      <H2>
        Heading 2
      </H2>
      <Spacer size={10} />
      <Text>
        Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
        magna mollis euismod. Donec sed odio dui.
        {' '}
      </Text>

      <Spacer size={30} />
      <H3>
        Heading 3
      </H3>
      <Spacer size={10} />
      <Text>
        Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
        mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada
        magna mollis euismod. Donec sed odio dui.
        {' '}
      </Text>
    </Content>
  </Container>
);

export default About;
