// reactstrap components
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "api";
import { Store, UpdateStore } from "StoreContext";

import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  ButtonDropdown,
  Row,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";

const ViewCandidate = () => {

  const [installments, setInstallments] = useState([]);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [count, SetCount] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [planIndex, setPlanIndex] = useState(0);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await api("get", `/users/${userId}`);
    setUser(user);
    if(user?.user?.payment_plan?.length > 0){
      getInstallment(user.user.payment_plan[0]._id);
      getCount(user.user.payment_plan[0]._id);
    }
  };

  const getInstallment = async (planID) => {
    const data = await api(
      "get",
      `/installments/getbyUser/${userId}/${planID}`
    );
    setInstallments(data);
  };
  const getCount = async (planID) => {
    await api(
      "post",
      `/installments/getInstallmentstatus/${userId}/${planID}`
    )
      .then((res) => {
        SetCount(res);
      })
      .catch((err) => {
        console.log("SUBMIT err", err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  const payInstallment = (id) => {
    if (!value) {
      toast.error("Date is required");
      return;
    }
    if (value > new Date()) {
      toast.error("You can't select a future Date");
      return;
    }
    const submission_date = {
      data: value,
    };
    api("put", `/installments/${id}`, submission_date).then(() => {
      toast.success("Installment  Paid successfully");
      getUser();
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">User's Installments</h3>
                  <ButtonDropdown
                    isOpen={isDropdownOpen}
                    toggle={(e) => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <DropdownToggle caret>
                      {user?.user?.payment_plan[planIndex]?.product_title ??
                        " Select a Plan"}
                    </DropdownToggle>
                    <DropdownMenu>
                      {user?.user?.payment_plan?.map((plan, index) => (
                        <DropdownItem
                          onClick={() => {
                            setPlanIndex(index);
                            getInstallment(plan._id);
                            getCount(plan._id);
                          }}
                        >
                          {plan.product_title}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Total Installments</th>
                    <th scope="col">Pending Installments</th>
                    <th scope="col">Paid Installments</th>
                  </tr>
                </thead>

                <tbody>
                  <th>{user?.user?.name}</th>
                  <th>
                    {user?.user?.payment_plan[planIndex]?.total_installments ??
                      "_"}{" "}
                  </th>
                  <th>{count?.Pending}</th>
                  <th>{count?.Paid}</th>
                </tbody>
              </Table>
              {
                installments.length == 0 ?
                <>
                  <p style={{ alignSelf: "center" }}>
                    No plans found.
                  </p>
                </> :
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Installment No.</th>
                      <th scope="col">Installment Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Submission Date</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {installments?.installment?.map((tech) => {
                      return (
                        <tr key={tech.id}>
                          <th>{tech?._id}</th>
                          <td>{tech?.paid_amount}</td>
                          <td>
                            {tech?.status === "paid" ? (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                {tech?.status}
                              </Badge>
                            ) : (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                {tech?.status}
                              </Badge>
                            )}
                          </td>
                          <td>{new Date(tech?.due_date).toDateString()}</td>
                          <td>
                            {tech?.submission_date
                              ? new Date(tech?.submission_date).toDateString()
                              : "_"}
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                {tech.status === "pending" ? (
                                  <div>
                                    <DatePicker
                                      onChange={onChange}
                                      value={value}
                                    />
                                    <DropdownItem
                                      href="#pablo"
                                      className="text-primary"
                                      onClick={() => payInstallment(tech?._id)}
                                    >
                                      Mark As Paid
                                    </DropdownItem>
                                  </div>
                                ) : (
                                  <DropdownItem
                                    href="#pablo"
                                    className="text-success"
                                  >
                                    Already Paid
                                  </DropdownItem>
                                )}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewCandidate;
