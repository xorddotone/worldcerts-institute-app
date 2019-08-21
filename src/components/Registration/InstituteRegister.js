import React, { Component } from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { pageTitle } from '../../Redux/action';
import { connect } from 'react-redux';

class UserAccountDetails extends Component {
  componentWillMount() {
    this.props.UpdateTitle("Institue Registration Field");
  }
  render() {
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Form Details</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label>Company/Institute Name</label>
                      <FormInput
                        placeholder="Name of Company / Institute"
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label >Business Registration Number (UEN)</label>
                      <FormInput
                        placeholder="UEN #"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label>Company/Institute Address</label>
                      <FormInput
                        placeholder="Address , street #......"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6">
                      <label>Company/Institute Webiste</label>
                      <FormInput
                        placeholder="Webiste"
                      />
                    </Col>
                    <Col md="6">
                      <label>Company/Institute Telephone #</label>
                      <FormInput
                        placeholder="Contact #"
                      />
                    </Col>
                  </Row>
                  <Row form style={{ marginTop: "15px" }}>
                    <Col md="6" className="form-group">
                      <label>Country</label>
                      <FormInput
                        placeholder="Country"
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label>Postal Code</label>
                      <FormInput
                        placeholder="Zip Code"
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Button theme="accent">Register</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(null, mapDispatchToProps)(UserAccountDetails);
