import { useDrag } from 'react-dnd';
import React from 'react';
import { Icon } from 'semantic-ui-react';

const DragElement = props => {
    const { dragItem, data, type, children, handleRemove, handleDrop } = props;
    // eslint-disable-next-line
    const [{ isDragging }, drag, preview] = useDrag({
        item: { data, type },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.dropEffect === 'move') {
                if (typeof dropResult.newParent.onDrop === 'function') {
                    dropResult.newParent.onDrop({
                        dragItem,
                        data: props.data,
                        newParent: dropResult.newParent,
                        parentId: dropResult.newParent.parentId
                    });
                }
                handleDrop({
                    dropEffect: dropResult.dropEffect,
                    newParent: dropResult.newParent,
                    oldParent: props,
                    data: props.data,
                    dragItem
                });
            }
        }
    });

    return (
        <div style={{ display: 'flex' }} ref={drag}>
            <div
                style={{
                    display: 'flex',
                    cursor: 'grab',
                    marginRight: '0.8em',
                    color: '#aaa'
                }}
            >
                <Icon
                    name="ellipsis vertical"
                    style={{ margin: '0', width: '6px' }}
                />
                <Icon
                    name="ellipsis vertical"
                    style={{ margin: '0', width: '6px' }}
                />
            </div>

            <div ref={preview} style={{ display: 'flex', flexGrow: 1 }}>
                {children}
            </div>

            {typeof handleRemove === 'function' ? (
                <div
                    style={{
                        display: 'flex',
                        cursor: 'pointer',
                        marginRight: '0.8em',
                        color: '#aaa',
                        alignItems: 'center'
                    }}
                >
                    <Icon
                        name="remove"
                        style={{
                            margin: '0',
                            width: '6px',
                            marginBottom: '5px'
                        }}
                        onClick={e => {
                            handleRemove(
                                props.parentId,
                                props.childId,
                                props.parentKey
                            );
                        }}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default DragElement;
