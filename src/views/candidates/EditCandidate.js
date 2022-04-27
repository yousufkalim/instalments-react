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

const EditCandidate = ({
  openModal,
  handleModal,
  user,
  setCandidate,
  getCandidates,
}) => {
  let [plans, setPlans] = useState([]);
  const [selectPlan, setSelectPlan] = useState(null);
  useEffect(() => {
    api("get", "/payments").then((res) => {
      setPlans(res.paymentPlans);
    });
  }, []);
  const handleInput = (e) => {
    if ("payment_plan" !== e.target.name)
      setCandidate({ ...user, [e.target.name]: e.target.value });
    else setSelectPlan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.cnic ||
      !user.number ||
      !user.gender
    ) {
      console.log(user, "User from fields");
      toast.error("All fields are required");
    } else {
      console.log(user, "user from api");
      api("put", `/users/${user._id}`, {
        ...user,
        payment_plan: selectPlan,
      })
        .then((res) => {
          toast.success("user Updated successfully");
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
          Edit a user
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
                          placeholder="Enter candidate's name here"
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
                          type="number"
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
                          value={selectPlan}
                          name="payment_plan"
                          onChange={handleInput}
                        >
                          <option value="">Select a Plan</option>
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
            Update
          </Button>

          <Button onClick={handleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditCandidate;
