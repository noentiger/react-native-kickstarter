import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => (
  <footer className="mt-5">
    <Row>
      <Col sm="12" className="text-right pt-3">
        <p>
          Based on the
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/monterosa/react-native-kickstarter-kit">
            Github Repo
          </a>
          {' '}
          here
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
