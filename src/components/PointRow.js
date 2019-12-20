import React from 'react';

const PointRow = props => {
    const point = props.point;

    return (
        <tbody>
        <tr>
            <td>{point.id}</td>
            <td>{point.x}</td>
            <td>{point.y}</td>
            <td>{point.r}</td>
            <td>{point.result ? 'true' : 'false'}</td>
        </tr>
        </tbody>
    );
};

export default PointRow;
