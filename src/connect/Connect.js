import React, { useEffect, useState } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import { PANEL_OPTIONS, PANELS, TYPO } from '../constants/Panels.const';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Layout from '../layout/Layout';
import LeftPanelContainer from './left-panel-container/LeftPanelContainer';
import RightPanelContainer from './right-panel-container/RightPanelContainer';
import objectPath from 'object-path';
import './Connect.scss';

export default function Connect() {
    const [selectedPanel, setSelectedPanel] = useState(TYPO.Person);
    const [leftPanels, setLeftPanels] = useState([]);
    const [rightPanels, setRightPanels] = useState([]);
    const [leftSelectedItems, setLeftSelectedItems] = useState({});
    const [rightSelectedItems, setRightSelectedItems] = useState({});
    const [lastLeftSelectedIndex, setLastLeftSelectedIndex] = useState({});
    const [lastRightSelectedIndex, setLastRightSelectedIndex] = useState({});

    useEffect(() => {
        if (selectedPanel) {
            getSetPanels(selectedPanel);
        }
    }, [selectedPanel]);

    function getSetPanels(panelName) {
        const panels = PANELS[panelName];
        setLeftPanels(panels.leftArray);
        setRightPanels(panels.rightArray);
        setRightSelectedItems({});
        setLeftSelectedItems({});
    }

    function handelChangePanel(e, data) {
        setSelectedPanel(data.value);
    }

    const handleItemSelection = (
        data,
        item,
        type,
        shiftKey,
        ctrlKey,
        index,
        selectKeyName
    ) => {
        const record = index < 0 ? '' : data[index];
        let arr = [];
        let lastIndexObj;
        let SelectedPanel = selectKeyName.split(
            selectKeyName.split('.')[0] + '.'
        )[1];
        if (selectKeyName.indexOf('rightSelectedItems') !== -1) {
            lastIndexObj = JSON.parse(
                JSON.stringify(Object.assign({}, lastRightSelectedIndex))
            );
        } else {
            lastIndexObj = JSON.parse(
                JSON.stringify(Object.assign({}, lastLeftSelectedIndex))
            );
        }
        // fixed error 'SelectedPanel' path get null
        const keyArr = SelectedPanel.split('.');
        keyArr.pop();
        const SelectedIndexVal = objectPath.set(lastIndexObj, keyArr.join('.'));
        if (SelectedIndexVal) {
            objectPath.set(lastIndexObj, SelectedPanel, index);
        }
        let lastSelectedIndex;
        if (selectKeyName.indexOf('rightSelectedItems') !== -1) {
            arr = objectPath.get(
                rightSelectedItems,
                selectKeyName.split('rightSelectedItems.')[1],
                []
            );
            if (Object.keys(lastRightSelectedIndex).length === 0) {
                const obj = {};
                objectPath.set(
                    obj,
                    selectKeyName.split('leftSelectedItems.')[1],
                    -1
                );
                lastSelectedIndex = obj;
            } else {
                lastSelectedIndex = lastRightSelectedIndex;
            }
        } else {
            arr = objectPath.get(
                leftSelectedItems,
                selectKeyName.split('leftSelectedItems.')[1],
                []
            );
            if (Object.keys(lastLeftSelectedIndex).length === 0) {
                const obj = {};
                objectPath.set(
                    obj,
                    selectKeyName.split('leftSelectedItems.')[1],
                    -1
                );
                lastSelectedIndex = obj;
            } else {
                lastSelectedIndex = lastLeftSelectedIndex;
            }
        }

        if (!ctrlKey && !shiftKey) {
            arr = [record];
        } else if (shiftKey) {
            if (objectPath.get(lastSelectedIndex, SelectedPanel, -1) >= index) {
                const temp =
                    objectPath.get(lastSelectedIndex, SelectedPanel, -1) > 0
                        ? [
                              data[
                                  objectPath.get(
                                      lastSelectedIndex,
                                      SelectedPanel,
                                      -1
                                  )
                              ]
                          ]
                        : arr;
                arr = [].concat.apply(
                    temp,
                    data.slice(
                        index,
                        objectPath.get(lastSelectedIndex, SelectedPanel, -1)
                    )
                );
            } else {
                const temp =
                    objectPath.get(lastSelectedIndex, SelectedPanel, -1) < 0
                        ? arr
                        : [
                              data[
                                  objectPath.get(
                                      lastSelectedIndex,
                                      SelectedPanel,
                                      -1
                                  )
                              ]
                          ];
                arr = [].concat.apply(
                    temp,
                    data.slice(
                        objectPath.get(lastSelectedIndex, SelectedPanel, -1) +
                            1,
                        index + 1
                    )
                );
            }
            objectPath.set(
                lastIndexObj,
                SelectedPanel,
                objectPath.get(lastSelectedIndex, SelectedPanel, -1)
            );
        } else if (ctrlKey) {
            const foundIndex = arr.findIndex(f => f === record);
            // If found remove it to unselect it.
            if (foundIndex >= 0) {
                arr = [
                    ...arr.slice(0, foundIndex),
                    ...arr.slice(foundIndex + 1)
                ];
            } else {
                arr = [...arr, record];
            }
        }
        if (selectKeyName.indexOf('rightSelectedItems') !== -1) {
            objectPath.set(
                rightSelectedItems,
                selectKeyName.split('rightSelectedItems.')[1],
                arr.filter((v, i, a) => a.findIndex(t => t._id === v._id) === i)
            );
            setRightSelectedItems(rightSelectedItems);
            setLastRightSelectedIndex(lastIndexObj);
        } else {
            objectPath.set(
                leftSelectedItems,
                selectKeyName.split('leftSelectedItems.')[1],
                arr.filter((v, i, a) => a.findIndex(t => t._id === v._id) === i)
            );
            setLeftSelectedItems(leftSelectedItems);
            setLastLeftSelectedIndex(lastIndexObj);
        }
    };
    return (
        <Layout shouldAuth>
            <div className="connect">
                <h1>Connect</h1>
                <DndProvider backend={HTML5Backend}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Dropdown
                                    style={{ marginBottom: '1rem' }}
                                    placeholder="Select panel"
                                    fluid
                                    selection
                                    onChange={handelChangePanel}
                                    options={PANEL_OPTIONS}
                                    value={selectedPanel}
                                />
                            </Grid.Column>
                            <Grid.Column width={8}>&nbsp;</Grid.Column>
                            <Grid.Column width={8}>
                                {leftPanels && leftPanels.length
                                    ? leftPanels.map((obj, index) => (
                                          <LeftPanelContainer
                                              key={index}
                                              selectKeyName={
                                                  'leftSelectedItems'
                                              }
                                              panelObj={obj}
                                              selectedItems={leftSelectedItems}
                                              fieldsArr={rightPanels}
                                              handleItemSelection={
                                                  handleItemSelection
                                              }
                                          />
                                      ))
                                    : null}
                            </Grid.Column>
                            <Grid.Column width={8}>
                                {rightPanels && rightPanels.length
                                    ? rightPanels.map((obj, index) => (
                                          <RightPanelContainer
                                              key={index}
                                              selectKeyName={
                                                  'rightSelectedItems'
                                              }
                                              panelObj={obj}
                                              selectedItems={rightSelectedItems}
                                              fieldsArr={rightPanels}
                                              handleItemSelection={
                                                  handleItemSelection
                                              }
                                          />
                                      ))
                                    : null}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </DndProvider>
            </div>
        </Layout>
    );
}
