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

const AddCandidate = ({ openModal, handleModal, getCandidates }) => {
  let [user, setUser] = useState({});
  let [plans, setPlans] = useState([]);

  useEffect(() => {
    api("get", "/payments").then((res) => {
      setPlans(res.paymentPlans);
      console.log("payments", res.paymentPlans);
    });
  }, []);
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("sUBMIT USER", user);
    e.preventDefault();

    if (
      (!user.name ||
        !user.email ||
        !user.payment_plan ||
        !user.gender ||
        !user.number,
      !user.cnic)
    ) {
      toast.error("All fields are required");
    } else {
      api("post", "/users", user).then((res) => {
        console.log(user, "User submit Post data");
        console.log(res, "User Post Response");
        toast.success("Candidate added successfully");
        getCandidates();
        handleModal();
      });
    }
  };

  return (
    <>
      <Modal isOpen={openModal} size="xl" centered>
        <ModalHeader charCode="Y" toggle={handleModal}>
          Add a User
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
                          value={user.name}
                          name="name"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Email</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter candidate's email here"
                          type="email"
                          value={user.email}
                          name="email"
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
                          placeholder="Enter user CNIC number here"
                          type="text"
                          value={user.cnic}
                          name="cnic"
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">
                          Phone Number
                        </label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          placeholder="Enter user Phone Number here"
                          type="text"
                          value={user.number}
                          name="number"
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
                          type="select"
                          value={user.payment_plan}
                          name="payment_plan"
                          onChange={handleInput}
                        >
                          <option>Select a Plan</option>
                          {plans.map((item, index) => (
                            <option value={`${item?._id}`}>{item?.plan}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9" style={{ margin: "auto" }}>
                      <FormGroup>
                        <label className="form-control-label">Gender</label>
                        <Input
                          className="form-control-alternative text-default"
                          required={true}
                          type="select"
                          value={user.gender}
                          name="gender"
                          onChange={handleInput}
                        >
                          <option>Select Your Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Input>
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

export default AddCandidate;
