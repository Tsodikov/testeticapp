import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm({display}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Main information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="name"
            name="name"
            label="Organization"
            fullWidth
            // autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="category"
            name="category"
            label="Category"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            // required
            id="description"
            name="description"
            label="Description"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="website"
            name="website"
            label="Web site"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="backgroundImage"
            name="backgroundImage"
            label="Background image"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="logo"
            name="logo"
            label="Logo"
            fullWidth
            // autoComplete="family-name"
            variant="standard"
          />
        </Grid>


        {/* 
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}