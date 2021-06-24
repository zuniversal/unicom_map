import {MapvglLayer} from 'react-bmapgl';

const defaultFontSize = 16;
const defaultFontFamily = 'Microsoft YaHei';
const defaultGetText = item => item.properties.text;
export default props => {
    const {
        labelOptions: {
            getText = defaultGetText,
            fontSize = defaultFontSize,
            fontFamily = defaultFontFamily,
            paddingHorizontal = 8,
            paddingVertical = 4,
            arrowSize = 10,
            textColor = '#000',
            backgroundColor = '#fff',
            borderColor = '#3377ff',
        } = {},
        ...restProps
    } = props;
    const options = Object.assign({
        // 计算所有包围框之前执行
        beforeComputeDimension: ctx => {
            ctx.font = fontSize + 'px ' + fontFamily;
        },
        // 计算每个项的包围框
        itemDimension: (item, ctx, extra) => {
            const text = getText(item);
            const nameDimension = ctx.measureText(text);
            const boxHeight = fontSize + 2 * paddingVertical;
            const borderRadius = boxHeight / 2;
            extra.text = text;
            extra.textWidth = nameDimension.width,
            extra.borderRadius = borderRadius;
            return [
                nameDimension.width + 2 * paddingHorizontal + boxHeight,
                boxHeight + arrowSize,
            ];
        },
        // 渲染之前
        beforeRenderAll: ctx => {
            ctx.textBaseline = 'top';
            ctx.font = fontSize + 'px ' + fontFamily;
        },
        // 渲染每个
        renderItem: (item, box, ctx, extra) => {
            const {x, y, w, h} = box;
            const {
                borderRadius,
                text,
                textWidth,
            } = extra;
            const totalWidth = borderRadius * 2 + textWidth + 2 * paddingHorizontal - 2;
            const rectHeight = 2 * borderRadius - 2;
            ctx.save();
            ctx.translate(x + 1, y + 1);
            ctx.fillStyle = backgroundColor;
            ctx.strokeStyle = borderColor;
            ctx.beginPath();
            ctx.arc(borderRadius, borderRadius, borderRadius, Math.PI * 0.5, Math.PI * 1.5);
            ctx.lineTo(totalWidth - borderRadius, 0);
            ctx.arc(totalWidth - borderRadius, borderRadius, borderRadius, Math.PI * 1.5, Math.PI * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            const centerX = totalWidth / 2;
            const halfArrowSize = arrowSize / 2;
            ctx.moveTo(centerX - halfArrowSize, rectHeight + 2);
            ctx.lineTo(centerX + halfArrowSize, rectHeight + 2);
            ctx.lineTo(centerX, rectHeight + arrowSize * 0.8 + 2);
            ctx.fillStyle = borderColor;
            ctx.fill();

            ctx.fillStyle = textColor;
            ctx.fillText(text, extra.borderRadius + paddingHorizontal, paddingVertical);

            ctx.restore();
        },
    }, props.options);
    return (<MapvglLayer
        {...restProps}
        type="PointCanvasCustomLayer"
        options={options}
    />);
};