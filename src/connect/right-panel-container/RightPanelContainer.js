import React, { useEffect, useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import QueryContainer from '../common-components/QueryContainer';
import queryBuilder from '../services/queryBuilder.service';
import { ListContainer } from '../common-components/ListContainer';
import DropElement from '../common-components/drop-element/DropElement';
import { TYPO } from '../../constants/Panels.const';

export default function RightPanelContainer({
    panelObj,
    selectKeyName,
    handleItemSelection,
    selectedItems,
    fieldsArr
}) {
    const fields = [];
    const dropTypes = [];
    fieldsArr.forEach(o => {
        fields.push(o.fieldName);
        dropTypes.push(o.tableName);
    });

    const [isActive, setIsActive] = useState(false);
    const [query, setQuery] = useState(null);

    useEffect(() => {
        if (isActive) {
            const GET_QUERY = queryBuilder(panelObj.tableName);
            setQuery(GET_QUERY);
        }
    }, [isActive, panelObj]);

    function handleToggle() {
        setIsActive(!isActive);
    }

    const handleDropRightToLeftData = e => {};

    return (
        <DropElement
            type={[TYPO.skills, TYPO.prerequisites, TYPO.persons, TYPO.process]}
            dropParent={selectKeyName}
        >
            <Accordion styled>
                <Accordion.Title active={isActive} onClick={handleToggle}>
                    <Icon name="dropdown" />
                    {panelObj && panelObj.tableName}
                </Accordion.Title>
                <Accordion.Content active={isActive}>
                    {isActive && (
                        <QueryContainer query={query}>
                            <ListContainer
                                selectKeyName={`${selectKeyName}.${panelObj.tableName}`}
                                selectKey={panelObj && panelObj.tableName}
                                handleDropData={handleDropRightToLeftData}
                                handleItemSelection={handleItemSelection}
                                selectedItems={selectedItems}
                                type={fields}
                            />
                        </QueryContainer>
                    )}
                </Accordion.Content>
            </Accordion>
        </DropElement>
    );
}
