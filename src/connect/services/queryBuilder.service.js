import gql from 'graphql-tag';

export default function queryBuilder(tableName, fieldsArr) {
    let filedQuery = '';
    if (fieldsArr) {
        const strArr = fieldsArr.map(o => {
            return `${o.fName ? o.fName : o.fieldName} {_id id name}`;
        });
        filedQuery = strArr.join(' ');
    }
    const query = fieldsArr
        ? gql`query ${tableName}Query {${tableName}(orderBy: name_asc) {_id id name ${filedQuery}}}`
        : gql`query ${tableName}Query {${tableName}(orderBy: name_asc) {_id id name} }`;

    return query;
}
