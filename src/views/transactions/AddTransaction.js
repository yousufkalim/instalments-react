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
  Label,
} from "reactstrap";
// core components

const AddTransaction = ({ openModal, handleModal, getTransactions, companyId }) => {

  let [transaction, setTransaction] = useState({});
  const handleInput = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transaction.amount) {
      toast.error("All fields are required");
    } else {
      transaction.company = companyId;
      api("post", "/transactions", transaction)
        .then((res) => {
          toast.success("Transaction added successfully");
          getTransactions();
          handleModal();
        })
        .catch((err) => {
          console.log("SUBMIT err", err);
        });
    }
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="Y" toggle={handleModal}>
          Add Transaction
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
            Save
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddTransaction;
