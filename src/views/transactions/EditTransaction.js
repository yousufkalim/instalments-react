import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";
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

const EditTransaction = ({ openModal, handleModal, transaction, setTransaction, getTransactions, companyId }) => {
  const handleInput = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transaction.amount) {
      toast.error("All fields are required");
    } else {
      api("put", `/transactions/${transaction._id}`, transaction).then((data) => {
        toast.success(data.message);
        getTransactions();
        handleModal();
      });
    }
  };

  return (
    <>
      {console.log(transaction, "plan inside controller")}
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="Y" toggle={handleModal}>
          Edit Transaction
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Amount</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter amount here"
                          type="text"
                          value={transaction.amount}
                          name="amount"
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

export default EditTransaction;
