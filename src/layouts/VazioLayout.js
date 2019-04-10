import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

const VazioLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {children}
      </Col>
    </Row>
  </Container>
);

VazioLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

VazioLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default VazioLayout;
