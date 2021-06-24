/* eslint-disable react/no-array-index-key */
import {FallOutlined, RiseOutlined} from '@ant-design/icons';

export default function (props) {
    const {isRise, percent = '-', contentText = ''} = props;

    return (
        <>
            {Number(percent) !== 0 ? (
                <div
                    style={{
                        color: isRise ? 'rgba(56, 192, 123, 1)' : 'rgba(255, 108, 112, 1)',
                        backgroundColor: isRise ? 'rgba(56, 192, 123, 0.1)' : 'rgba(255, 108, 112, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: '0 3px',
                    }}
                >
                    {isRise ? <RiseOutlined /> : <FallOutlined />}
                    <span>{contentText + percent + '%'}</span>
                </div>
            ) : null}
        </>
    );
}
