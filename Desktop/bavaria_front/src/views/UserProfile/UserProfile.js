import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import clsx from "clsx";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
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

export default function UserProfile() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const sendData = () => {
    let data = [
      {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        amount: amount,
        role: role,
      },
    ];

    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }

    axios({
      method: "POST",
      url: "http://localhost:8000/api/user",
      data: data,
    }).then(() => {
      setSuccess(true);
      setLoading(false);
      setMessage(true);
    });
  };

  const activeBtn = () => {
    if (name && lastname && email && password && amount && role) {
      return loading;
    }

    return true;
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Crear nuevo usuario para la nómina
              </h4>
              <p className={classes.cardCategoryWhite}>completar información</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField margin="normal" fullWidth={true} color="secondary" required id="name" label="Nombre"  onChange={(e) => setName(e.target.value)} />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField margin="normal" fullWidth={true} color="secondary" required label="Apellido" onChange={(e) => setLastname(e.target.value)} />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField type="email" margin="normal" fullWidth={true} color="secondary" required label="Correo" onChange={(e) => setEmail(e.target.value)} />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField type="password" margin="normal" fullWidth={true} color="secondary" required label="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField margin="normal" fullWidth={true} color="secondary" required label="Salario" onChange={(e) => setAmount(e.target.value)} />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField margin="normal" fullWidth={true} color="secondary" required label="Rol" onChange={(e) => setRole(e.target.value)} />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <div className={classes.wrapper}>
                <Button className={buttonClassname} color="primary" disabled={activeBtn()} onClick={() => sendData()}>Crear Usuario</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
              {message ? <Alert severity="success">Usuario guardado exitosamente</Alert> : ""}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

