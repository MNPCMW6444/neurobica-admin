import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useState } from "react";
import "./formStyle.css";

interface GenericFormProps {}

export default function GenericForm({}: GenericFormProps) {
  const [amount, setamount] = useState<any>("amount");
  const [isOneTime, setisOneTime] = useState<any>("isOneTime");
  const [oneTimeDate, setoneTimeDate] = useState<any>("oneTimeDate");
  const [recTimePer, setrecTimePer] = useState<any>("oneTimeDate");
  const [reqTimeDay, setreqTimeDay] = useState<any>("reqTimeDay");
  const [depatments, setdepatments] = useState<any>("more");
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
      spacing={10}
    >
      <Grid item>
        <Typography variant="h1"></Typography>
      </Grid>
      <Grid item>
        <Typography variant="h1">Fill the form:</Typography>
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
          <label>isOneTime:</label>
        </Grid>
        <Grid item>
          <input
            value={isOneTime}
            type="checkbox"
            onChange={(e) => setisOneTime(e.target.value)}
            placeholder="isOneTime"
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
          <label>oneTimeDate:</label>
        </Grid>
        <Grid item>
          <input
            value={oneTimeDate}
            onChange={(e) => setoneTimeDate(e.target.value)}
            placeholder="oneTimeDate"
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
          <label>recTimePer:</label>
        </Grid>
        <Grid item>
          <input
            value={recTimePer}
            onChange={(e) => setrecTimePer(e.target.value)}
            placeholder="recTimePer"
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
          <label>reqTimeDay:</label>
        </Grid>
        <Grid item>
          <input
            value={reqTimeDay}
            onChange={(e) => setreqTimeDay(e.target.value)}
            placeholder="reqTimeDay"
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
          <label>depatments:</label>
        </Grid>
        <Grid item>
          <input
            value={depatments}
            onChange={(e) => setdepatments(e.target.value)}
            placeholder="depatments"
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
