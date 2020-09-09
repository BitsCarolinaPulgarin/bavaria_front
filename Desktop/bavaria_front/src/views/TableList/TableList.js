import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { green, purple } from "@material-ui/core/colors";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const tableStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: purple[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function TableList() {
  const classes = useStyles();
  const table = tableStyles();
  const [nomina, setNomina] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const getNomina = () => {
    axios.get("http://localhost:8000/api/nomina").then((resp) => {
      setNomina(resp.data.data);
    });
  };

  const payNomina = (id) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    axios.put("http://localhost:8000/api/nomina/" + id).then((resp) => {
      setNomina(resp.data.data);
      setSuccess(true);
      setLoading(false);
      setMessage(true);
    });
  };

  useEffect(() => {
    getNomina();
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Lista de nóminas a pagar</h4>
            <p className={classes.cardCategoryWhite}>
              nómina pendiente mes actual
            </p>
          </CardHeader>
          <CardBody>
            <div className={table.tableResponsive}>
              <Table className={table.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={table.tableHeadRow}>
                    <TableCell className={table.tableCell}>Nombre</TableCell>
                    <TableCell className={table.tableCell}>Corte</TableCell>
                    <TableCell className={table.tableCell}>Salario</TableCell>
                    <TableCell className={table.tableCell}>Estado</TableCell>
                    <TableCell className={table.tableCell}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nomina.map((row) => (
                    <TableRow key={row.name} className={table.tableHeadRow}>
                      <TableCell className={table.tableCell}>{row.name + ' ' + row.lastname}</TableCell>
                      <TableCell className={table.tableCell}>{row.date}</TableCell>
                      <TableCell className={table.tableCell}>{row.amount}</TableCell>
                      <TableCell className={table.tableCell}>{row.status}</TableCell>
                      <TableCell className={table.tableCell}>
                        <div className={classes.wrapper}>
                          <Button className={buttonClassname} disabled={row.status === 'PAGADO' ? true : loading} variant="contained" color="primary" onClick={payNomina.bind(this, row.user_id)}>
                            Pagar
                        </Button>
                          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {message ? <Alert severity="success">Nómina pagada</Alert> : ""}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}


