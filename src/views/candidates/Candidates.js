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
import { Store, UpdateStore } from "StoreContext";
import {
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";

// core components
import AddCandidate from "./AddCandidate";
import EditCandidate from "./EditCandidate";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Candidates = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [candidate, setCandidate] = useState({});
  const { candidates } = Store();
  const updateStore = UpdateStore();
  const history = useHistory();
  const { pathname } = window.location;

  useEffect(() => {
    getCandidates();
  }, []);

  const getCandidates = async () => {
    const data = await api("get", "/users");
    if (pathname === "/admin/invited-candidates") {
      updateStore({
        candidates: data.users.filter((a) => a.test_conducted === false),
      });
    } else if (pathname === "/admin/pending-candidates") {
      updateStore({
        candidates: data.users.filter((a) => a.test_conducted === true),
      });
    } else {
      updateStore({ candidates: data.users });
    }
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    setCandidate(item || candidate);
    setEditModal((open) => !open);
    return openModal;
  };

  const navToViewCandidate = (id) => {
    history.push(`/admin/candidates/${id}`);
  }

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
                  <h3 className="mb-0">Users</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">CNIC</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((item) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <span className="mb-0 text-sm" title={item.name}>
                              {item.name?.length > 30
                                ? item.name?.substring(0, 30) + "..."
                                : item.name}
                            </span>
                          </Media>
                        </th>
                        <td title={item.email}>
                          {item.email?.length > 30
                            ? item.email?.substring(0, 30) + "..."
                            : item.email}
                        </td>
                        <td>{item.cnic}</td>
                        <td>{item.gender}</td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
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
                              <DropdownItem
                                href="#pablo"
                                className="text-primary"
                                onClick={() => navToViewCandidate(item._id)}
                              >
                                Payment Plans
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                className="text-success"
                                onClick={() => handleEditModal(item)}
                              >
                                Edit
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddCandidate
            openModal={openModal}
            handleModal={handleModal}
            getCandidates={getCandidates}
          />
        )}
        {editModal && (
          <EditCandidate
            openModal={editModal}
            handleModal={handleEditModal}
            user={candidate}
            setCandidate={setCandidate}
            getCandidates={getCandidates}
          />
        )}
      </Container>
    </>
  );
};

export default Candidates;
