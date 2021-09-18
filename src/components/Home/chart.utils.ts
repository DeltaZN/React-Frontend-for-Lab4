
export const drawRectangle = (ctx: CanvasRenderingContext2D, radius: number, color: string) => {
    ctx.beginPath();
    ctx.rect(150, 150-radius*13, 130*(radius/5), (radius)*13);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

export const drawSector = (ctx: CanvasRenderingContext2D, radius: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 65*(radius/5), 0, Math.PI/2, false);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

export const drawTriangle = (ctx: CanvasRenderingContext2D, radius: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150-(130*(radius/5)), 150);
    ctx.lineTo(150, 150-radius*13);
    ctx.lineTo(150, 150);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

export const drawYAxisLabels = (ctx: CanvasRenderingContext2D, startX: number, startY: number, labels: string[]) => {
    let y = startY;
    const dashOffset = 5;
    const dashLength = 10;
    const labelDistance = 26;
    const dashStartX = startX - dashLength - dashOffset;
    const dashEndX = startX - dashOffset;
    for (const label of labels) {
        ctx.fillText(label, startX, y);
        ctx.moveTo(dashStartX, y);
        ctx.lineTo(dashEndX, y);
        y -= labelDistance;
    }
}

export const drawXAxisLabels = (ctx: CanvasRenderingContext2D, startX: number, startY: number, labels: string[]) => {
    let x = startX;
    const dashOffset = 5;
    const dashLength = 10;
    const labelDistance = 26;
    const labelYOffset = 20;
    const labelXOffset = 7;
    const dashStartY = startY - dashLength - dashOffset;
    const dashEndY = startY - dashOffset;
    for (const label of labels) {
        ctx.fillText(label, x - labelXOffset, startY - labelYOffset);
        ctx.moveTo(x, dashStartY);
        ctx.lineTo(x, dashEndY);
        x += labelDistance;
    }
}

export const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    const arrowXOffset = 5;
    const arrowYOffset = 15;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - arrowXOffset, y2 + arrowYOffset);
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + arrowXOffset, y2 + arrowYOffset);
}