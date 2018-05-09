import React from 'react';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from './app.theme';

const onRequestClose = () => {
  console.log("close");
};

const Root = ({ d2 }) => {
    return (
      <MuiThemeProvider muiTheme={appTheme}>
        <SharingDialog
            open={true}
            id="lyLU2wR22tC"
            type="dataSet"
            onRequestClose={onRequestClose}
            d2={d2}
        />
      </MuiThemeProvider>
    );
};

export default Root;
