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

const AddCompany = ({ openModal, handleModal, getCompanies }) => {

  let [company, setCompany] = useState({});
  const handleInput = (e) => {
    console.log(e, "Handle Input");
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company.name || !company.address || !company.contact) {
      toast.error("All fields are required");
    } else {
      api("post", "/companies", company)
      .then((res) => {
        toast.success("Company added successfully");
        getCompanies();
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
          Add Company
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <Form>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Name</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter name here"
                          type="text"
                          value={company.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Address
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter address here"
                          type="text"
                          value={company.address}
                          name="address"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Contact
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter contact here"
                          type="text"
                          value={company.contact}
                          name="contact"
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

export default AddCompany;
