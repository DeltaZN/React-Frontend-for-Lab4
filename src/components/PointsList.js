import React from 'react';
import PointRow from "./PointRow";
import {pipe} from "fp-ts/function";
import {sequenceT} from "fp-ts/Apply";
import {option as optionInstance} from "fp-ts/Option";
import {option} from "fp-ts";

const PointsList = props => {
    pipe(
        sequenceT(optionInstance)(option.fromNullable(props.currentUser), option.fromNullable(props.points)),
        option.fold(_ =>
                (<div className="points">Loading...</div>),
            ([, points]) => (
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>Id</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>HIT</th>
                        </tr>
                        </tbody>
                        {points.map(point => (<PointRow point={point} key={point.id}/>))}
                    </table>
                </div>
            )
        )
    )
};

export default PointsList;
