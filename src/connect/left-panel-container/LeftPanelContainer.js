import React, { useEffect, useState } from 'react';
import queryBuilder from '../services/queryBuilder.service';
import QueryContainer from '../common-components/QueryContainer';
import objectPath from 'object-path';
import { Accordion, Icon } from 'semantic-ui-react';
import { PANELS, TYPO } from '../../constants/Panels.const';
import { ListContainer } from '../common-components/ListContainer';
import DropElement from '../common-components/drop-element/DropElement';
import { useMutation } from '@apollo/react-hooks';
import {
    ADD_PERSON_PREREQUISITES,
    ADD_PERSON_SKILLS,
    ADD_PREREQUISITE_PEOPLE,
    ADD_PREREQUISITE_PROCESSES,
    ADD_PROCESS_PREREQUISITES,
    ADD_PROCESS_SKILLS,
    ADD_SKILL_PEOPLE,
    ADD_SKILL_PROCESSES,
    REMOVE_PERSON_PREREQUISITES,
    REMOVE_PERSON_SKILLS,
    REMOVE_PREREQUISITE_PEOPLE,
    REMOVE_PREREQUISITE_PROCESSES,
    REMOVE_PROCESS_PREREQUISITES,
    REMOVE_PROCESS_SKILLS,
    REMOVE_SKILL_PEOPLE,
    REMOVE_SKILL_PROCESSES
} from '../../constants/queries.const';

export default function LeftPanelContainer({
    panelObj,
    fieldsArr,
    selectKeyName,
    selectedItems,
    handleItemSelection
}) {
    const [query, setQuery] = useState(null);

    useEffect(() => {
        if (panelObj) {
            const GET_QUERY = queryBuilder(panelObj.tableName, fieldsArr);
            setQuery(GET_QUERY);
        }
    }, [panelObj, fieldsArr]);

    return (
        <QueryContainer query={query}>
            <AccordionContainer
                selectKey={panelObj.tableName}
                selectKeyName={`${selectKeyName}.${panelObj.tableName}`}
                selectedItems={selectedItems}
                handleItemSelection={handleItemSelection}
            />
        </QueryContainer>
    );
}

const AccordionContainer = ({
    data,
    getDocData,
    setDocData,
    selectKey,
    selectedItems,
    selectKeyName,
    handleItemSelection
}) => {
    return data && data[selectKey] && data[selectKey].length
        ? data[selectKey].map((obj, index) => (
              <AccordionPanel
                  key={index}
                  allData={data}
                  accordionObj={obj}
                  parentIndex={index}
                  selectKeyName={`${selectKeyName}.${index}`}
                  selectedItems={selectedItems}
                  selectKey={selectKey}
                  handleItemSelection={handleItemSelection}
              />
          ))
        : null;
};

const AccordionPanel = ({
    allData,
    accordionObj,
    parentIndex,
    selectKeyName,
    selectedItems,
    selectKey,
    handleItemSelection
}) => {
    const fields = [];
    const dropTypes = [];
    let type = selectKey;
    if (selectKey === TYPO.Skill) {
        type = TYPO.Skills;
    } else if (selectKey === TYPO.Prerequisite) {
        type = TYPO.Pre_requisites;
    }
    PANELS[type].rightArray.forEach(o => {
        fields.push(o.fieldName);
        dropTypes.push(o.tableName);
    });

    const [addPersonSkillDoc] = useMutation(ADD_PERSON_SKILLS);
    const [addPersonPrerequisiteDoc] = useMutation(ADD_PERSON_PREREQUISITES);

    const [addProcessSkillDoc] = useMutation(ADD_PROCESS_SKILLS);
    const [addProcessPrerequisiteDoc] = useMutation(ADD_PROCESS_PREREQUISITES);

    const [addSkillPeopleDoc] = useMutation(ADD_SKILL_PEOPLE);
    const [addSkillProcessesDoc] = useMutation(ADD_SKILL_PROCESSES);

    const [addPrerequisitePeopleDoc] = useMutation(ADD_PREREQUISITE_PEOPLE);
    const [addPrerequisiteProcessesDoc] = useMutation(
        ADD_PREREQUISITE_PROCESSES
    );
    const [removePersonSkillDoc] = useMutation(REMOVE_PERSON_SKILLS);
    const [removePersonPrerequisiteDoc] = useMutation(
        REMOVE_PERSON_PREREQUISITES
    );
    const [removeProcessSkillDoc] = useMutation(REMOVE_PROCESS_SKILLS);
    const [removeProcessPrerequisiteDoc] = useMutation(
        REMOVE_PROCESS_PREREQUISITES
    );

    const [removeSkillPeopleDoc] = useMutation(REMOVE_SKILL_PEOPLE);
    const [removeSkillProcessesDoc] = useMutation(REMOVE_SKILL_PROCESSES);
    const [removePrerequisitePeopleDoc] = useMutation(
        REMOVE_PREREQUISITE_PEOPLE
    );
    const [removePrerequisiteProcessesDoc] = useMutation(
        REMOVE_PREREQUISITE_PROCESSES
    );

    const [isActive, setIsActive] = useState(false);

    function handleToggle() {
        setIsActive(!isActive);
    }

    const handleDropLeftToRightData = argsObj => {
        let dropData = Object.assign({}, argsObj.data);
        const keyArr = argsObj.oldParent.parentKey.split('.');
        const itemType = keyArr.pop();
        const parentIndex = keyArr.pop();
        const childTypes = argsObj.newParent.type;
        const parentType = Object.keys(allData)[0];
        if (Object.keys(dropData).length === 0) {
            dropData[parentType] = [];
            objectPath.set(
                dropData,
                [parentType, parentIndex, itemType],
                [argsObj.dragItem]
            );
        } else if (dropData[parentType] && dropData[parentType].length) {
            if (dropData[parentType][parentIndex]) {
                if (dropData[parentType][parentIndex][itemType]) {
                    const isFind = dropData[parentType][parentIndex][
                        itemType
                    ].find(o => o.id === argsObj.dragItem.id);
                    if (!isFind) {
                        dropData[parentType] = [];
                        objectPath.set(
                            dropData,
                            [parentType, parentIndex, itemType],
                            [argsObj.dragItem]
                        );
                    }
                } else {
                    dropData[parentType] = [];
                    objectPath.set(
                        dropData,
                        [parentType, parentIndex, itemType],
                        [argsObj.dragItem]
                    );
                }
            } else {
                dropData[parentType] = [];
                objectPath.set(
                    dropData,
                    [parentType, parentIndex, itemType],
                    [argsObj.dragItem]
                );
            }
        }

        if (dropData && dropData[parentType] && dropData[parentType].length) {
            dropData[parentType].forEach((obj, index) => {
                const parent = objectPath.get(allData, [parentType, index]);
                childTypes.forEach(val => {
                    if (obj[val] && obj[val].length) {
                        obj[val].forEach(o => {
                            const varObj = {
                                variables: {
                                    fromId: parent.id,
                                    toId: o.id
                                }
                            };
                            switch (parentType) {
                                case TYPO.Person:
                                    if (val === TYPO.skills) {
                                        removePersonSkillDoc(varObj);
                                    } else if (val === TYPO.prerequisites) {
                                        removePersonPrerequisiteDoc(varObj);
                                    }
                                    break;
                                case TYPO.Process:
                                    if (val === TYPO.skills) {
                                        removeProcessSkillDoc(varObj);
                                    } else if (val === TYPO.prerequisites) {
                                        removeProcessPrerequisiteDoc(varObj);
                                    }
                                    break;
                                case TYPO.Skill:
                                    if (val === TYPO.persons) {
                                        removeSkillPeopleDoc(varObj);
                                    } else if (val === TYPO.process) {
                                        removeSkillProcessesDoc(varObj);
                                    }
                                    break;
                                case TYPO.Prerequisite:
                                    if (val === TYPO.persons) {
                                        removePrerequisitePeopleDoc(varObj);
                                    } else if (val === TYPO.process) {
                                        removePrerequisiteProcessesDoc(varObj);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        });
                    }
                });
            });
        }
    };

    const handleDropRightToLeftData = e => {
        let dropData = Object.assign({}, e.data);
        // Handel drop with out select and row
        if (
            Object.keys(dropData).length === 0 ||
            !dropData[e.dragItem[TYPO.typename]].length
        ) {
            dropData[e.dragItem[TYPO.typename]] = [e.dragItem];
        } else {
            // if selected item (e.data) present but dragItem not present in selected item (e.data)
            // then only drop dragItem
            const isFind = dropData[e.dragItem[TYPO.typename]].find(
                o => o.id === e.dragItem.id
            );
            if (!isFind) {
                dropData = {};
                dropData[e.dragItem[TYPO.typename]] = [e.dragItem];
            }
        }
        const parentObj = e.newParent;
        const parentType = Object.keys(allData);
        const parentData = allData[parentType][parentObj.parentIndex];
        dropTypes.forEach((val, index) => {
            let childKey = fields[index];
            // check for skill and Prerequisite people instead of person
            // So, used people instead of person
            if (
                parentData &&
                (parentData[TYPO.typename] === TYPO.Skill ||
                    parentData[TYPO.typename] === TYPO.Prerequisite)
            ) {
                if (
                    childKey === TYPO.persons &&
                    Object.keys(parentData).includes(TYPO.people)
                ) {
                    childKey = TYPO.people;
                } else if (
                    childKey === TYPO.process &&
                    Object.keys(parentData).includes(TYPO.processes)
                ) {
                    childKey = TYPO.processes;
                }
            }

            if (dropData[val] && dropData[val].length) {
                dropData[val].forEach(obj => {
                    const isFind =
                        parentData &&
                        parentData[childKey] &&
                        parentData[childKey].length &&
                        parentData[childKey].find(o => o.id === obj.id);
                    if (!isFind) {
                        const valObj = {
                            variables: {
                                fromId: e.parentId,
                                toId: obj.id
                            }
                        };
                        switch (val) {
                            case TYPO.Skill:
                                if (selectKey === TYPO.Person) {
                                    addPersonSkillDoc(valObj);
                                } else if (selectKey === TYPO.Process) {
                                    addProcessSkillDoc(valObj);
                                }
                                break;
                            case TYPO.Prerequisite:
                                if (selectKey === TYPO.Person) {
                                    addPersonPrerequisiteDoc(valObj);
                                } else if (selectKey === TYPO.Process) {
                                    addProcessPrerequisiteDoc(valObj);
                                }
                                break;
                            case TYPO.Person:
                                if (selectKey === TYPO.Prerequisite) {
                                    addPrerequisitePeopleDoc(valObj);
                                } else if (selectKey === TYPO.Skill) {
                                    addSkillPeopleDoc(valObj);
                                }
                                break;
                            case TYPO.Process:
                                if (selectKey === TYPO.Prerequisite) {
                                    addPrerequisiteProcessesDoc(valObj);
                                } else if (selectKey === TYPO.Skill) {
                                    addSkillProcessesDoc(valObj);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
        });
    };

    return (
        <DropElement
            type={dropTypes}
            dropParent={selectKeyName}
            parentIndex={parentIndex}
            parentId={accordionObj.id}
            onDrop={handleDropRightToLeftData}
        >
            <Accordion styled>
                <Accordion.Title active={isActive} onClick={handleToggle}>
                    <Icon name="dropdown" />
                    {accordionObj.name}
                </Accordion.Title>
                <Accordion.Content active={isActive}>
                    {fields && fields.length
                        ? fields.map((field, index) => (
                              <ListContainer
                                  key={index}
                                  selectKeyName={`${selectKeyName}.${field}`}
                                  selectedItems={selectedItems}
                                  data={accordionObj}
                                  selectKey={field}
                                  dropType={dropTypes[index]}
                                  handleDropData={handleDropLeftToRightData}
                                  handleItemSelection={handleItemSelection}
                              />
                          ))
                        : null}
                </Accordion.Content>
            </Accordion>
        </DropElement>
    );
};
