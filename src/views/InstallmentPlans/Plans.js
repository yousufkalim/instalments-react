/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "api";
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
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import AddPlan from "./AddPlan";
import EditPlan from "./EditPlan";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Plans = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [plan, setPlan] = useState({});
  const [plans, Setplans] = useState([]);
  const history = useHistory();
  const { pathname } = window.location;

  useEffect(async () => {
    getPlans();
  }, []);

  const getPlans = async () => {
    return api("get", "/payments").then((data) => {
      console.log("data.paymentPlans", data.paymentPlans);
      Setplans(data.paymentPlans);
    });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    setPlan(item || plan);
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDelete = (id) => {
    api("delete", `/payments/${id}`).then(() => {
      toast.success("Plan deleted successfully");
      getPlans();
    });
  };

  return (
    <>
      {console.log("PLans", plans)}
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between ">
                  <h3 className="mb-0">Installment Plan</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Installment Plan
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Total Installments</th>
                    <th scop="col">Deposit Payment</th>
                    <th scop="col">Total Payment</th>
                    <th scop="col">Mark up%</th>
                    <th scop="col">Monthly Installment</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {plans.map((item) => {
                    return (
                      <tr>
                        <td title={item.plan}>{item.plan}</td>
                        <td title={item.total_installments}>
                          {item.total_installments}
                        </td>
                        <td title={item.deposit_payment}>
                          {item.deposit_payment}
                        </td>
                        <td title={item.total_payment}>{item.total_payment}</td>
                        <td title={item.mark_up}>{item.mark_up}</td>
                        <td title={item.monthly_installment}>
                          {item.monthly_installment}
                        </td>
                        <td title={item.createdAt}>
                          {new Date(item.createdAt).toDateString()}
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
                              {item.test_conducted && (
                                <DropdownItem
                                  onClick={() =>
                                    history.push(
                                      `/admin/candidates/${item._id}`
                                    )
                                  }
                                >
                                  View
                                </DropdownItem>
                              )}
                              {/* <DropdownItem
                                href="#pablo"
                                onClick={() => handleEditModal(item)}
                              >
                                Edit
                              </DropdownItem> */}
                              <DropdownItem
                                href="#pablo"
                                className="text-danger"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </DropdownItem>
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
        {openModal && (
          <AddPlan
            openModal={openModal}
            handleModal={handleModal}
            getCandidates={getPlans}
          />
        )}
        {editModal && (
          <EditPlan
            openModal={editModal}
            handleModal={handleEditModal}
            plan={plan}
            setPlan={setPlan}
            getPlans={getPlans}
          />
        )}
      </Container>
    </>
  );
};

export default Plans;
