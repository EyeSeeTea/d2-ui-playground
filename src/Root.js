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
            type: params.type || props.type,
            id: params.id  || props.id,
            t: d2.i18n.translations,
            model: null,
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
            lastUpdated: 1,
        });
    }

    onChange(model) {
        console.log("onChange", model);
        this.setState({model});
    }

    onCurrentInterpretationChange(interpretation) {
        const interpretationId = interpretation ? interpretation.id : undefined;
        const newParams = { ...queryString.parse(location.search), interpretationId } ;
        const stringified = queryString.stringify(newParams);
        window.history.pushState(null, null, "/?" + stringified);
        console.log("onCurrentInterpretationChange", interpretation);
        this.setState( {currentInterpretationId: interpretationId });
    }

    updateInterpretations() {
        this.setState({lastUpdated: new Date().toString()})
    }

    render() {
        const { currentInterpretationId, type, id, model } = this.state;

        return (
            <MuiThemeProvider muiTheme={appTheme}>
                <div>
                    <div style={{width: 'auto', float: "left"}}>
                        <p>Object type: {type}</p>
                        <p>Object ID: {id}</p>
                        <p>Use query strings <i>type</i> and <i>id</i> to load a favorite</p>
                        {model &&
                            <div>
                                <p>Model name: {model.name}</p>
                                <p>Model description: {model.description}</p>
                            </div>
                        }

                        <button onClick={this.updateInterpretations.bind(this)}>Update panel</button>
                    </div>

                    <div style={{position: "absolute", right: 10, width: 400}}>
                        <Interpretations
                            d2={this.props.d2}
                            t={this.state.t}
                            type={type}
                            id={id}
                            lastUpdated={this.state.lastUpdated}
                            onChange={this.onChange}
                            currentInterpretationId={currentInterpretationId}
                            onCurrentInterpretationChange={this.onCurrentInterpretationChange}
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

Root.defaultProps = {
    type: "map",
    id: "zDP78aJU8nX",
};

export default Root;
