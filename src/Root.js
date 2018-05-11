import React, { Component } from 'react';
import Interpretations from '@dhis2/d2-ui-interpretations';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from './app.theme';
import queryString from 'query-string';

class Root extends Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(location.search);
    this.state = {
      currentInterpretationId: params.interpretationId,
      type: params.type,
      id: params.id,
    };
    window.onpopstate = this.onHashChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCurrentInterpretationChange = this.onCurrentInterpretationChange.bind(this);
  }

  onHashChange() {
    const params = queryString.parse(location.search);
    this.setState({
      currentInterpretationId: params.interpretationId,
      type: params.type,
      id: params.id,
    });
  }

  onChange(model) {
    console.log("onChange", model.name, model.description);
  }

  onCurrentInterpretationChange(interpretation) {
    const interpretationId = interpretation ? interpretation.id : undefined;
    const newParams = { ...queryString.parse(location.search), interpretationId } ;
    const stringified = queryString.stringify(newParams);
    window.history.pushState(null, null, "/?" + stringified);
    this.setState( {currentInterpretationId: interpretationId });
  }

  render() {
    const { currentInterpretationId, type, id } = this.state;

    return (
      <MuiThemeProvider muiTheme={appTheme}>
        <div style={{width: 300}}>
          <Interpretations
              d2={this.props.d2}
              type={type}
              id={id}
              onChange={this.onChange}
              currentInterpretationId={currentInterpretationId}
              onCurrentInterpretationChange={this.onCurrentInterpretationChange}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Root;
