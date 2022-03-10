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
  Card,
  CardHeader,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
} from "reactstrap";

// core components
import AddCompany from "./AddCompany";
import EditCompany from "./EditCompany";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Companies = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [company, setCompany] = useState({});
  const [companies, setCompanies] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    return api("get", "/companies").then((data) => {
      setCompanies(data.companies);
    });
  };

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const navToTransactions = (item) => {
    history.push(`/transactions/${item._id}`);
  };

  const handleEditModal = (item) => {
    setCompany(item || company);
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDeleteModal = (id) => {
    api("delete", `/companies/${id}`).then((data) => {
      toast.success(data.message);
      getCompanies();
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
                  <h3 className="mb-0">Companies</h3>
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Company
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scop="col">Contact</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {companies.map((item) => {
                    return (
                      <tr>
                        <td title={item.name}>{item.name}</td>
                        <td title={item.address}>
                          {item.address}
                        </td>
                        <td title={item.contact}>
                          {item.contact}
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
                              <DropdownItem
                                href="#pablo"
                                className="text-primary"
                                onClick={() => navToTransactions(item)}
                              >
                                Transactions
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                className="text-success"
                                onClick={() => handleEditModal(item)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                className="text-danger"
                                onClick={() => handleDeleteModal(item._id)}
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
            </Card>
          </div>
        </Row>
        {openModal && (
          <AddCompany
            openModal={openModal}
            handleModal={handleModal}
            getCompanies={getCompanies}
          />
        )}
        {editModal && (
          <EditCompany
            openModal={editModal}
            handleModal={handleEditModal}
            company={company}
            setCompany={setCompany}
            getCompanies={getCompanies}
          />
        )}
      </Container>
    </>
  );
};

export default Companies;
