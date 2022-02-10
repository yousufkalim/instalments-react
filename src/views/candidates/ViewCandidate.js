// reactstrap components
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "api";
import { Store, UpdateStore } from "StoreContext";

import {
  Badge,
  Card,
  CardHeader,
  Button,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  ButtonDropdown,
  Row,
  UncontrolledTooltip,
  Alert,
} from "reactstrap";

// core components
import AddCandidate from "./AddCandidate";
import EditCandidate from "./EditCandidate";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";

const ViewCandidate = () => {
  // const isFirstTime = useRef(true);

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [installment, setInstallment] = useState(null);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { plan } = useParams();
  const [count, SetCount] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [planIndex, setPlanIndex] = useState(0);
  const [InstallmentPlan, SetInstallmentPlan] = useState(plan);
  const { candidates } = Store();
  const [value, onChange] = useState(new Date());

  console.log(userId, plan, "Data from Params");
  useEffect(() => {
    getInstallment();
    getCount();
    getUser();
  }, [JSON.stringify(InstallmentPlan)]);

  const getUser = async () => {
    const user = await api("get", `/users/${userId}`);
    setUser(user);
  };

  const getInstallment = async () => {
    const data = await api(
      "get",
      `/installments/getbyUser/${userId}/${InstallmentPlan}`
    );
    setInstallment(data);
  };
  const getCount = async () => {
    await api(
      "post",
      `/installments/getInstallmentstatus/${userId}/${InstallmentPlan}`
    )
      .then((res) => {
        SetCount(res);
      })
      .catch((err) => {
        console.log("SUBMIT err", err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  const PayInstallment = (id) => {
    console.log("Installment Paid");
    if (!value) {
      toast.error("Date is required");
      return;
    }
    if (value > new Date()) {
      toast.error("You can't select future Date");
      return;
    }
    const submission_date = {
      data: value,
    };
    api("put", `/installments/${id}`, submission_date).then(() => {
      toast.success("Installment  Paid successfully");
      getInstallment();
      getCount();
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
                      {user?.user?.payment_plan[planIndex]?.plan ??
                        " Select a Plan"}
                    </DropdownToggle>
                    <DropdownMenu>
                      {user?.user?.payment_plan.map((plan, index) => (
                        <DropdownItem
                          onClick={() => {
                            setPlanIndex(index);
                            SetInstallmentPlan(plan._id);
                          }}
                        >
                          {plan.plan}
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
                  {installment?.installment?.map((tech) => {
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
                                    onClick={() => PayInstallment(tech?._id)}
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
                              {/* <DropdownItem
                                href="#pablo"
                                className="text-danger"
                                // onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownItem> */}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewCandidate;
