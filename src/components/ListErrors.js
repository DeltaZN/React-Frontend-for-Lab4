import React from 'react';
import {constNull, pipe} from "fp-ts/function";
import {option} from "fp-ts";

class ListErrors extends React.Component {
    render() {
        const errors = this.props.errors;
        return pipe(
            option.fromNullable(errors),
            option.fold(constNull, errors => (
                <ul className="error-messages">
                    <li key={errors}>
                        {errors}
                    </li>
                </ul>
            ))
        )
    }
}

export default ListErrors;
