import React, { Fragment, useState } from 'react';
import objectPath from 'object-path';
import SearchElement from './search-element';
import { List } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import {
    REMOVE_PERSON_PREREQUISITES,
    REMOVE_PERSON_SKILLS,
    REMOVE_PREREQUISITE_PEOPLE,
    REMOVE_PREREQUISITE_PROCESSES,
    REMOVE_PROCESS_PREREQUISITES,
    REMOVE_PROCESS_SKILLS,
    REMOVE_SKILL_PEOPLE,
    REMOVE_SKILL_PROCESSES
} from '../../constants/queries.const';
import { TYPO } from '../../constants/Panels.const';
import DragElement from './drag-element/DragElement';

export const ListContainer = props => {
    const {
        data,
        selectKey,
        selectKeyName,
        selectedItems,
        handleDropData,
        handleItemSelection,
        dropType
    } = props;
    const key = selectKeyName.split('.');
    key.shift();
    const idArr = objectPath.get(selectedItems, key, []).map(o => o.id);

    let dataKey = selectKey;
    // check for skill and Prerequisite people instead of person
    // So, used people instead of person
    if (
        data &&
        (data[TYPO.typename] === TYPO.Skill ||
            data[TYPO.typename] === TYPO.Prerequisite)
    ) {
        if (
            dataKey === TYPO.persons &&
            Object.keys(data).includes(TYPO.people)
        ) {
            dataKey = TYPO.people;
        } else if (
            dataKey === TYPO.process &&
            Object.keys(data).includes(TYPO.processes)
        ) {
            dataKey = TYPO.processes;
        }
    }
    const [searchStr, setSearchStr] = useState();

    const handleDrop = (...arg) => {
        handleDropData(...arg);
    };

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

    const handleRemove = (parentId, childId, parentKey) => {
        const pathArr = parentKey.split('.');
        const parentType = pathArr[1];
        const childType = pathArr[3];
        const varObj = {
            variables: {
                fromId: parentId,
                toId: childId
            }
        };
        switch (parentType) {
            case TYPO.Person:
                if (childType === TYPO.skills) {
                    removePersonSkillDoc(varObj);
                } else if (childType === TYPO.prerequisites) {
                    removePersonPrerequisiteDoc(varObj);
                }
                break;
            case TYPO.Process:
                if (childType === TYPO.skills) {
                    removeProcessSkillDoc(varObj);
                } else if (childType === TYPO.prerequisites) {
                    removeProcessPrerequisiteDoc(varObj);
                }
                break;
            case TYPO.Skill:
                if (childType === TYPO.persons) {
                    removeSkillPeopleDoc(varObj);
                } else if (childType === TYPO.process) {
                    removeSkillProcessesDoc(varObj);
                }
                break;
            case TYPO.Prerequisite:
                if (childType === TYPO.persons) {
                    removePrerequisitePeopleDoc(varObj);
                } else if (childType === TYPO.process) {
                    removePrerequisiteProcessesDoc(varObj);
                }
                break;
            default:
                break;
        }
    };

    const setSearchCriteria = value => {
        setSearchStr(value);
    };

    return (
        <List>
            <Fragment>
                {data && data[dataKey] && data[dataKey].length ? (
                    <List.Item>
                        <SearchElement
                            type={selectKey}
                            label={
                                selectKeyName.split('.')[0].includes('left')
                                    ? dropType
                                    : false
                            }
                            onSearch={setSearchCriteria}
                        />
                    </List.Item>
                ) : null}
                {data && data[dataKey] && data[dataKey].length
                    ? data[dataKey]
                          .sort((a, b) => (a.name > b.name ? 1 : -1))
                          .map((obj, index) =>
                              !searchStr ||
                              (searchStr &&
                                  obj.name
                                      .toLowerCase()
                                      .indexOf(searchStr.toLowerCase()) !==
                                      -1) ? (
                                  <div
                                      className={`draggable-row ${
                                          idArr.includes(obj.id) ? 'active' : ''
                                      }`}
                                      key={index}
                                      onClick={e => {
                                          handleItemSelection(
                                              data[dataKey].filter(
                                                  o =>
                                                      !searchStr ||
                                                      (searchStr &&
                                                          o.name
                                                              .toLowerCase()
                                                              .indexOf(
                                                                  searchStr.toLowerCase()
                                                              ) !== -1)
                                              ),
                                              obj,
                                              selectKey,
                                              e.shiftKey,
                                              e.ctrlKey,
                                              index,
                                              selectKeyName
                                          );
                                      }}
                                  >
                                      <DragElement
                                          dragItem={obj}
                                          data={selectedItems}
                                          type={selectKey}
                                          parentKey={selectKeyName}
                                          parentId={data.id}
                                          childId={obj.id}
                                          handleRemove={
                                              selectKeyName
                                                  .split('.')[0]
                                                  .includes('left')
                                                  ? handleRemove
                                                  : false
                                          }
                                          handleDrop={handleDrop}
                                      >
                                          <List.Item style={{ width: '100%' }}>
                                              <label>{obj.name}</label>
                                          </List.Item>
                                      </DragElement>
                                  </div>
                              ) : null
                          )
                    : null}
            </Fragment>
        </List>
    );
};
