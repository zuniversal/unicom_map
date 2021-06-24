import {MapvglLayer} from 'react-bmapgl';
export default function CustomLabelLayer(props) {
    const defaultFontSize = 16;
    const defaultFontFamily = 'Microsoft YaHei';
    const defaultGetText = item => item.properties.text;
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
    const options = Object.assign(
        {
            // 计算所有包围框之前执行
            beforeComputeDimension: ctx => {
                ctx.font = fontSize + 'px ' + fontFamily;
            },
            // 计算每个项的包围框，增加换行处理
            itemDimension: (item, ctx, extra) => {
                const text = getText(item);
                let txt = text.split('\n');
                let maxText = txt.reduce((prev, curr) => {
                    return prev.length < curr.length ? curr : prev;
                }, '');
                const nameDimension = ctx.measureText(maxText);
                const boxHeight = fontSize + 2 * paddingVertical;
                const borderRadius = boxHeight / 2;
                extra.text = text;
                extra.textWidth = nameDimension.width;
                extra.borderRadius = borderRadius;
                return [
                    nameDimension.width + 2 * paddingHorizontal + boxHeight,
                    boxHeight * (txt.length + 1) + arrowSize,
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
                const {borderRadius, text, textWidth} = extra;
                let txt = text.split('\n');
                const totalWidth = borderRadius * 2 + textWidth + 2 * paddingHorizontal;
                const textHeight = 2 * borderRadius;
                const rectHeight = textHeight * txt.length + 2 * borderRadius;

                ctx.save();
                ctx.translate(x + 1, y + 1);
                ctx.fillStyle = backgroundColor;
                ctx.strokeStyle = borderColor;
                ctx.beginPath();
                ctx.arc(borderRadius, borderRadius, borderRadius, Math.PI, Math.PI * 1.5);
                ctx.lineTo(totalWidth - borderRadius, 0);

                ctx.arc(totalWidth - borderRadius, borderRadius, borderRadius, Math.PI * 1.5, 0);
                ctx.lineTo(totalWidth, rectHeight - borderRadius);

                ctx.arc(totalWidth - borderRadius, rectHeight - borderRadius, borderRadius, Math.PI * 0, Math.PI * 0.5);
                ctx.lineTo(borderRadius, rectHeight);
                ctx.arc(borderRadius, rectHeight - borderRadius, borderRadius, Math.PI * 0.5, Math.PI * 1);
                ctx.lineTo(0, borderRadius);

                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                const centerX = totalWidth / 2;
                const halfArrowSize = arrowSize / 2;
                ctx.moveTo(centerX - halfArrowSize, rectHeight);
                ctx.lineTo(centerX + halfArrowSize, rectHeight);
                ctx.lineTo(centerX, rectHeight + arrowSize * 0.8);
                ctx.fillStyle = borderColor;
                ctx.fill();

                ctx.fillStyle = textColor;
                txt.forEach((t, i) => {
                    ctx.fillText(t, borderRadius + paddingHorizontal, borderRadius + textHeight * i);
                });

                ctx.restore();
            },
        },
        props.options
    );
    return <MapvglLayer {...restProps} type="PointCanvasCustomLayer" options={options} />;
}
