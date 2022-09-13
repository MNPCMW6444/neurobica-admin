import Grid from "@mui/material/Grid";
import React from "react";
import { useState } from "react";

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
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: "100vh" }}
      wrap="nowrap"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
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

      <Grid item>
        <label>oneTimeDate:</label>
        <input
          value={oneTimeDate}
          onChange={(e) => setoneTimeDate(e.target.value)}
          placeholder="oneTimeDate"
        ></input>
      </Grid>
      <Grid item>
        <label>recTimePer:</label>
        <input
          value={recTimePer}
          onChange={(e) => setrecTimePer(e.target.value)}
          placeholder="recTimePer"
        ></input>
      </Grid>
      <Grid item>
        <label>reqTimeDay:</label>
        <input
          value={reqTimeDay}
          onChange={(e) => setreqTimeDay(e.target.value)}
          placeholder="reqTimeDay"
        ></input>
      </Grid>
      <Grid item>
        <label>depatments:</label>
        <input
          value={depatments}
          onChange={(e) => setdepatments(e.target.value)}
          placeholder="depatments"
        ></input>
      </Grid>
      <Grid item>
        <input value={more} onChange={(e) => setmore(e.target.value)}></input>
        placehlder="more"
      </Grid>
      <Grid item>
        <label>invoice:</label>
        <input
          value={invoice}
          onChange={(e) => setinvoice(e.target.value)}
          placeholder="invoice"
        ></input>
      </Grid>
    </Grid>
  );
}
