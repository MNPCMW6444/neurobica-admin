import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React from "react";
import { useState } from "react";
import "./formStyle.css";
import domain from "./domain";
interface GenericFormProps {
  closeModal: Function;
}

export default function GenericForm({ closeModal }: GenericFormProps) {
  const [amount, setamount] = useState<any>();
  const [isOneTime, setisOneTime] = useState<any>(false);
  const [oneTimeDate, setoneTimeDate] = useState<any>(new Date().toISOString());
  const [monthly, setmonthly] = useState<any>(true);
  const [reqTimeDay, setreqTimeDay] = useState<any>();
  const [reqTimeMonth, setreqTimeMonth] = useState<any>();
  const [department, setdepartment] = useState<any>("");
  const [more, setmore] = useState<any>("");
  // const [invoice, setinvoice] = useState<any>("invoice");

  const [message, setMessage] = useState<any>("");

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ height: "100vh" }}
      wrap="nowrap"
      spacing={4}
    >
      <Grid item>
        <Typography variant="h1"></Typography>
      </Grid>
      <Grid item>
        <Typography variant="h1">Fill the Form:</Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <label>Amount:</label>
        </Grid>
        <Grid item>
          <input
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            placeholder="amount"
          ></input>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <label>One-Time Expense?</label>
        </Grid>
        <Grid item>
          <input
            style={{ transform: "scale(2)" }}
            checked={isOneTime}
            type="checkbox"
            onChange={() => setisOneTime(!isOneTime)}
          ></input>
        </Grid>
      </Grid>
      {isOneTime && (
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <label>Date:</label>
          </Grid>
          <Grid item>
            <input
              value={oneTimeDate}
              onChange={(e) => setoneTimeDate(e.target.value)}
              placeholder="oneTimeDate"
            ></input>
          </Grid>
        </Grid>
      )}
      {!isOneTime && (
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <label>{monthly ? "Monthly" : "Yearly"} Expense?</label>
          </Grid>
          <Grid item>
            <input
              style={{ transform: "scale(2)" }}
              checked={true}
              type="checkbox"
              onChange={() => setmonthly(!monthly)}
            ></input>
          </Grid>
        </Grid>
      )}
      {!isOneTime && (
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <label>Day:</label>
          </Grid>
          <Grid item>
            <input
              value={reqTimeDay}
              onChange={(e) => setreqTimeDay(e.target.value)}
              placeholder="day of expence every month"
            ></input>
          </Grid>
        </Grid>
      )}
      {!isOneTime && !monthly && (
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <label>Month:</label>
          </Grid>
          <Grid item>
            <input
              value={reqTimeMonth}
              onChange={(e) => setreqTimeMonth(e.target.value)}
              placeholder="month of expence every year"
            ></input>
          </Grid>
        </Grid>
      )}
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <label>Department:</label>
        </Grid>
        <Grid item>
          <input
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
            placeholder="department"
          ></input>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <label>More:</label>
        </Grid>
        <Grid item>
          <input
            value={more}
            onChange={(e) => setmore(e.target.value)}
            placeholder="more"
          ></input>
        </Grid>
      </Grid>
      {/*   <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <label>invoice:</label>
        </Grid>
        <Grid item>
          <input
            value={invoice}
            onChange={(e) => setinvoice(e.target.value)}
            placeholder="invoice"
          ></input>
        </Grid>
      </Grid> */}
      <Grid item>
        <Button
          sx={{
            backgroundColor: "gray",
            color: "orange",
            fontSize: "2rem",
            borderRadius: "10px",
          }}
          onClick={async () => {
            const res = await axios.post(domain + "/reqfin", {
              amount,
              isOneTime,
              oneTimeDate,
              monthly,
              reqTimeDay,
              reqTimeMonth,
              department,
              more,
            });
            setMessage(res.data._id ? "Success!" : "Error!");
            setTimeout(() => closeModal(), 1000);
          }}
        >
          Send
        </Button>
        <Grid item>{message}</Grid>
      </Grid>
    </Grid>
  );
}
