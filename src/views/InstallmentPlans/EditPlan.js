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
} from "reactstrap";
// core components

const EditPlan = ({ openModal, handleModal, plan, setPlan, getPlans }) => {
  const handleInput = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !plan.product_title ||
      !plan.product_description ||
      !plan.plan
    ) {
      console.log(plan, "Plan from fields");
      toast.error("All fields are required");
    } else {
      api("put", `/payments/${plan._id}`, plan).then((res) => {
        toast.success("Plan updated successfully.");
        getPlans();
        handleModal();
      });
    }
  };

  return (
    <>
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
                        <label className="form-control-label">Product Title</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Product title here"
                          type="text"
                          value={plan.product_title}
                          name="product_title"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Product Description</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Product description here"
                          type="text"
                          value={plan.product_description}
                          name="product_description"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
                          disabled={true}
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Total Installments"
                          type="number"
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
                          disabled={true}
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Deposit Amount"
                          type="number"
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
                          disabled={true}
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Total Amount"
                          type="number"
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
                          disabled={true}
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter Deposit Amount"
                          type="number"
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditPlan;
