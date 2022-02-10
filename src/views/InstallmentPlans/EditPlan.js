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
const EditPlan = ({ openModal, handleModal, plan, setPlan, getPlans }) => {
  const handleInput = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!plan.plan || !plan.deposit_payment || !plan.total_installments) {
      console.log(plan, "Plan from fields");
      toast.error("All fields are required");
    } else {
      api("put", `/payments/${plan._id}`, plan).then((res) => {
        toast.success("plan Updated successfully");
        getPlans();
        handleModal();
      });
    }
  };

  return (
    <>
      {console.log(plan, "plan inside controller")}
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="Y" toggle={handleModal}>
          Edit Plan
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
                          placeholder="Enter Investment here"
                          type="text"
                          value={plan?.plan}
                          name="plan"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">CNIC</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Deposit Payment here"
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
                          Total Installments
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter total installments here"
                          type="text"
                          value={plan?.total_installments}
                          name="total_installments"
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditPlan;
