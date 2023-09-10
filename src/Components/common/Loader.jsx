import * as React from "react";
import Box from "@mui/material/Box";
import { Skeleton, Grid } from "@mui/material";

const generateTable = () => {
  const table = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      row.push(
        <Grid item key={j} xs={2}>
          <Skeleton variant="rounded" width={130} height={30} />
        </Grid>
      );
    }
    table.push(
      <Grid container item key={i} spacing={1}>
        {row}
      </Grid>
    );
  }
  return table;
};

export default function App() {
  return (
    <Box sx={{ p: 1, m: 7, width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={2.4}>
          <Skeleton variant="rounded" width={"190px"} height={"450px"} />
        </Grid>
        <Grid item xs={9}>
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Skeleton variant="rounded" width={130} height={40} />
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Skeleton animation="wave" width={"60%"} height={20} />
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Skeleton variant="rounded" width={"50%"} height={45} />
          </Grid>
          <Grid container sx={{ mt: 3 }} spacing={2}>
            {generateTable()}
          </Grid>

          <Grid container sx={{ mt: 3 }} spacing={0}>
            <Grid item xs={0.5}>
              <Skeleton variant="circular" width={25} height={25} />
            </Grid>
            <Grid item xs={0.5}>
              <Skeleton variant="circular" width={25} height={25} />
            </Grid>
            <Grid item xs={0.5}>
              <Skeleton variant="circular" width={25} height={25} />
            </Grid>
            <Grid item xs={0.5}>
              <Skeleton variant="circular" width={25} height={25} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
