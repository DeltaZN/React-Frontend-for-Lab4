import React from 'react';
import { connect } from 'react-redux';
import agent from "../../agent";
import {POINT_ADDED, POINTS_RECALCULATED} from "../../constants/actionTypes";
import {drawArrow, drawRectangle, drawSector, drawTriangle, drawXAxisLabels, drawYAxisLabels} from "./chart.utils";

const mapStateToProps = state => ({
    points: state.points.points_r,
    rc: state.points.rc,
    current_r: state.points.current_r
});

const mapDispatchToProps = dispatch => ({
    recalculatedPoints: (r) => {
        dispatch({ type: POINTS_RECALCULATED, payload: agent.Points.recalculated(r), r})
    },
    onCanvasClick: (x, y, r) => {
        dispatch({ type: POINT_ADDED, payload: agent.Points.new(x, y, r), r})
    }
});

class Graphic extends React.Component {

    addPointFromCanvas = this.addPointFromCanvas.bind(this);


    componentWillMount() {
        this.props.recalculatedPoints(1);
    }

    componentDidMount() {
        this.drawGraphic(1);
    }

    render() {
        return (
            <div className="graphic">
                <canvas width="300" height="300" ref={node => this.graphic = node} onClick={this.addPointFromCanvas} />
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.rc) {
            this.drawGraphic(nextProps.rc);
            if (!nextProps.current_r || nextProps.current_r !== nextProps.rc)
                this.props.recalculatedPoints(nextProps.rc);
        }
        if (nextProps.points) {
            nextProps.points.map(point => this.drawPoint(point));
        }
    }

    drawPoint(point) {

        let x = point.x, y = point.y, hit = point.result;
        let context = this.graphic.getContext("2d");

        context.beginPath();
        context.rect(Math.round(150 + ((x / 5) * 130)) - 3, Math.round(150 - ((y / 5) * 130)) - 3, 6, 6);
        context.closePath();
        context.strokeStyle = 'black';

        let color = 'red';

        if (hit) {
            color = 'lime';
        }

        context.fillStyle = color;
        context.fill();
        context.stroke();

    }

    addPointFromCanvas(event) {

        let br = this.graphic.getBoundingClientRect();
        let left = br.left;
        let top = br.top;

        const x = event.clientX - left;
        const y = event.clientY - top;
        console.log(`x=${x} y=${y}`);

        const xCalculated = (x - 150) / 130 * 5;
        const yCalculated = (-y + 150) / 130 * 5;

        this.props.onCanvasClick(xCalculated, yCalculated, this.props.rc || 1);

    }

    drawGraphic(radius) {
        const areaColor = "#2f9aff";
        const axesColor = "black";
        const ctx = this.graphic.getContext("2d");
        ctx.clearRect(0, 0, this.graphic.width, this.graphic.height);

        drawRectangle(ctx, radius, areaColor);
        drawSector(ctx, radius, areaColor);
        drawTriangle(ctx, radius, areaColor);

        // axes
        ctx.beginPath();
        ctx.font = "10px Verdana";
        ctx.strokeStyle = axesColor;
        ctx.fillStyle = axesColor;
        drawArrow(ctx, 150, 300, 150, 0);
        ctx.fillText("Y", 160, 10);
        drawArrow(ctx, 0, 150, 300, 150);
        ctx.fillText("X", 290, 130);

        drawYAxisLabels(ctx, 160, 124, [' 1', ' 2', ' 3', ' 4', ' 5']);
        drawYAxisLabels(ctx, 160, 280, ['-4', '-5', '-3', '-2', '-1']);

        drawXAxisLabels(ctx, 20, 160, ['-1', '-2', '-3', '-4', '-5']);
        drawXAxisLabels(ctx, 176, 160, [' 1', ' 2', ' 3', ' 4', ' 5']);

        ctx.closePath();
        ctx.stroke();

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Graphic);
