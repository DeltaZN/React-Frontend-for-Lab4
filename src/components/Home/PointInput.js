import React from 'react';
import ListErrors from '../ListErrors';
import agent from '../../agent';
import { connect } from 'react-redux';
import {POINT_ADDED, UPDATE_FIELD_POINT} from "../../constants/actionTypes";

const mapStateToProps = state => ({ ...state.points });


const mapDispatchToProps = dispatch => ({
    onChangeX: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'xc', value }),
    onChangeY: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'yc', value }),
    onChangeR: value =>
        dispatch({ type: UPDATE_FIELD_POINT, key: 'rc', value }),
    onSubmit: (x, y, r) => {
        dispatch({ type: POINT_ADDED, payload: agent.Points.new(x, y, r), r})
    }
});

class PointInput extends React.Component {

    handleXChange = ev => this.props.onChangeX(ev.target.value);

    handleYChange = ev => this.props.onChangeY(ev.target.value);

    handleRadiusChange = ev => this.props.onChangeR(ev.target.value);

    submitForm = (x, y, r) => ev => {
        ev.preventDefault();
        this.props.onSubmit(x, y, r);
    };

    render() {
        const x = this.props.xc;
        const y = this.props.yc;
        const r = this.props.rc;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">

                            <ListErrors errors={this.props.errors} />

                            <form onSubmit={this.submitForm(x, y, r)}>
                                <fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="X"
                                            value={x}
                                            onChange={this.handleXChange} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Y"
                                            value={y}
                                            onChange={this.handleYChange} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="R"
                                            value={r}
                                            onChange={this.handleRadiusChange} />
                                    </fieldset>

                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit">
                                        CHECK
                                    </button>

                                </fieldset>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PointInput);
