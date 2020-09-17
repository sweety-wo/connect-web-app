export const PANEL_OPTIONS = [
    { text: 'Person', value: 'Person' },
    { text: 'Skills', value: 'Skills' },
    { text: 'Pre-requisites', value: 'Pre-requisites' },
    { text: 'Process', value: 'Process' }
];

export const PANELS = {
    Person: {
        leftArray: [{ tableName: 'Person', fieldName: 'persons' }],
        rightArray: [
            { tableName: 'Skill', fieldName: 'skills' },
            { tableName: 'Prerequisite', fieldName: 'prerequisites' }
        ]
    },
    Skills: {
        leftArray: [{ tableName: 'Skill', fieldName: 'skills' }],
        rightArray: [
            { tableName: 'Person', fieldName: 'persons', fName: 'people' },
            { tableName: 'Process', fieldName: 'process', fName: 'processes' }
        ]
    },
    'Pre-requisites': {
        leftArray: [{ tableName: 'Prerequisite', fieldName: 'prerequisites' }],
        rightArray: [
            { tableName: 'Person', fieldName: 'persons', fName: 'people' },
            { tableName: 'Process', fieldName: 'process', fName: 'processes' }
        ]
    },
    Process: {
        leftArray: [{ tableName: 'Process', fieldName: 'process' }],
        rightArray: [
            { tableName: 'Skill', fieldName: 'skills' },
            { tableName: 'Prerequisite', fieldName: 'prerequisites' }
        ]
    }
};

export const TYPO = {
    typename: '__typename',
    Skills: 'Skills',
    Skill: 'Skill',
    skills: 'skills',
    Pre_requisites: 'Pre-requisites',
    Prerequisite: 'Prerequisite',
    prerequisites: 'prerequisites',
    Person: 'Person',
    persons: 'persons',
    people: 'people',
    Process: 'Process',
    process: 'process',
    processes: 'processes'
};
