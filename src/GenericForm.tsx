import Grid from "@mui/material/Grid";
import React from "react";

interface GenericFormProps {
  fields: [];
}
export default function GenericForm({ fields }: GenericFormProps) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: "100vh" }}
      wrap="nowrap"
    >
      {fields.map((field) => (
        <Grid item>{23423432}</Grid>
      ))}
    </Grid>
  );
}
