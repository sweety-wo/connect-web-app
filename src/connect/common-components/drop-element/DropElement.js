import React from 'react';
import { useDrop } from 'react-dnd';

const DropElement = props => {
    const { children, isEmpty, type } = props;
    // eslint-disable-next-line
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: type,
        drop: () => ({ newParent: props }),
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    return (
        <div
            ref={drop}
            style={{
                width: '100%',
                background: isEmpty ? '#f9f9f9' : 'transparent'
            }}
        >
            {' '}
            {children}
        </div>
    );
};

export default DropElement;
