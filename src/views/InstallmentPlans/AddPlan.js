import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { Select } from "antd";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";
// core components

const { Option } = Select;

const AddPlan = ({ openModal, handleModal, getCandidates }) => {
  console.log("Handle Input");

  let [plan, setPlan] = useState({});
  const handleInput = (e) => {
    console.log(e, "Handle Input");
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("SUBMIT Plan", plan);
    e.preventDefault();

    if (!plan.plan || !plan.total_installments || !plan.deposit_payment) {
      toast.error("All fields are required");
    } else {
      console.log(plan, "Plan");
      api("post", "/payments", plan)
        .then((res) => {
          toast.success("Plan added successfully");
          getCandidates();
          handleModal();
        })
        .catch((err) => {
          console.log("SUBMIT err", err.response.data.message);
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="Y" toggle={handleModal}>
          Add Installment Plan
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Plan</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Plan title here"
                          type="text"
                          value={plan.plan}
                          name="plan"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Total Installments
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Total Installments"
                          type="email"
                          value={plan?.total_installments}
                          name="total_installments"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Deposit Amount
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Deposit Amount"
                          type="text"
                          value={plan?.deposit_payment}
                          name="deposit_payment"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Total Payment
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Total Amount"
                          type="text"
                          value={plan?.total_payment}
                          name="total_payment"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Total MarkUp%
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Deposit Amount"
                          type="text"
                          value={plan?.mark_up}
                          name="mark_up"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPlan;
