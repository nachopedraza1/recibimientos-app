import { FC } from 'react';

interface Props {
    top?: string | number,
    bottom?: string | number,
    left?: string | number,
    right?: string | number,
    height?: string | number,
    width?: string | number,
    opacity?: string | number,
}

export const Blob: FC<Props> = ({ top, bottom, left, right, height = 600, width = "60%", opacity = 1 }) => {
    return (
        <div
            className="blobs"
            style={{ top: top, bottom: bottom, left: left, right: right, height: height, width: width, opacity: opacity }}
        >
            <div className="purple-blob"></div>
            <div className="blue-blob"></div>
            <div className="cyan-blob"></div>
        </div>
    )
}