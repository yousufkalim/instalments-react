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
import { useParams, useHistory } from "react-router-dom";
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
import AddTransaction from "./AddTransaction";
import EditTransaction from "./EditTransaction";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";

const Transactions = ({ status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [credit, setCredit] = useState(0);

  const { companyId } = useParams();
  const history = useHistory();

  useEffect(async () => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    return api("get", `/transactions/all/${companyId}`).then((data) => {
      console.log("data.transactions", data.transactions);
      setTransactions(data.transactions);
      parseCredit(data.transactions);
    });
  };

  const parseCredit = (data) => {
    let _credit = 0;
    for( let i = 0; i < data.length; i++ ){
      _credit = _credit + data[i].amount;
    }
    setCredit(_credit);
  }

  const handleModal = () => {
    setOpenModal((open) => !open);
    return openModal;
  };

  const handleEditModal = (item) => {
    setTransaction(item || transaction);
    setEditModal((open) => !open);
    return openModal;
  };

  const handleDeleteModal = (id) => {
    api("delete", `/transactions/${id}`).then((data) => {
      toast.success(data.message);
      getTransactions();
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
                  <h3 className="mb-0">Transactions</h3>
                  {
                    transactions
                    ? <p
                        className="mb-0"
                        style={{ fontSize: "18" }}
                      >
                        Credit: {credit}
                      </p>
                    : <></>
                  }
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleModal}
                    size="md"
                  >
                    <i className="ni ni-fat-add"></i>
                    Add Transaction
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Amount</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item) => {
                    return (
                      <tr>
                        <td title={item.amount}>{item.amount}</td>
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
          <AddTransaction
            openModal={openModal}
            handleModal={handleModal}
            getTransactions={getTransactions}
            companyId={companyId}
          />
        )}
        {editModal && (
          <EditTransaction
            openModal={editModal}
            handleModal={handleEditModal}
            transaction={transaction}
            setTransaction={setTransaction}
            getTransactions={getTransactions}
            companyId={companyId}
          />
        )}
      </Container>
    </>
  );
};

export default Transactions;
