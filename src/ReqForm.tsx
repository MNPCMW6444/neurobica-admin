import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useState } from "react";
import "./formStyle.css";

interface GenericFormProps {}

export default function GenericForm({}: GenericFormProps) {
  const [amount, setamount] = useState<any>("amount");
  const [isOneTime, setisOneTime] = useState<any>(false);
  const [oneTimeDate, setoneTimeDate] = useState<any>(new Date());
  const [monthly, setmonthly] = useState<any>(true);
  const [reqTimeDay, setreqTimeDay] = useState<any>();
  const [reqTimeMonth, setreqTimeMonth] = useState<any>();
  const [departments, setdepartments] = useState<any>("more");
  const [more, setmore] = useState<any>("more");
  const [invoice, setinvoice] = useState<any>("invoice");

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
          <label>departments:</label>
        </Grid>
        <Grid item>
          <input
            value={departments}
            onChange={(e) => setdepartments(e.target.value)}
            placeholder="departments"
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
          <label>more:</label>
        </Grid>
        <Grid item>
          <input
            value={more}
            onChange={(e) => setmore(e.target.value)}
            placeholder="more"
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
          <label>invoice:</label>
        </Grid>
        <Grid item>
          <input
            value={invoice}
            onChange={(e) => setinvoice(e.target.value)}
            placeholder="invoice"
          ></input>
        </Grid>
      </Grid>
    </Grid>
  );
}
