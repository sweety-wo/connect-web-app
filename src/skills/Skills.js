import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from '../layout/Layout';
import { Loader, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ORDER_CONST } from '../constants/Keys.const';

export default function Skills() {
    const [orderBy, setOrderBy] = useState('name_asc');
    const [column, setColumn] = useState('name');
    const [direction, setDirection] = useState(ORDER_CONST.ascending);
    const { loading, data, error, refetch } = useQuery(GET_SKILL, {
        variables: {
            orderBy
        }
    });

    useEffect(() => {
        if (direction === ORDER_CONST.ascending) {
            setOrderBy(`${column}_${ORDER_CONST.asc}`);
        } else {
            setOrderBy(`${column}_${ORDER_CONST.desc}`);
        }
    }, [direction, column]);

    useEffect(() => {
        refetch({ variables: { orderBy } });
    }, [orderBy, refetch]);

    const handleSort = clickedColumn => () => {
        setColumn(clickedColumn);
        if (column === clickedColumn) {
            setDirection(
                direction === ORDER_CONST.ascending
                    ? ORDER_CONST.descending
                    : ORDER_CONST.ascending
            );
        } else {
            setDirection(ORDER_CONST.ascending);
        }
    };

    return (
        <Layout shouldAuth>
            <div className="skill">
                <div className="skill__title">
                    <h1>Skills</h1>
                </div>
                {loading ? (
                    <Loader active />
                ) : error ? (
                    <Segment>There was an error while getting data</Segment>
                ) : (
                    <Table sortable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'id' ? direction : null}
                                    onClick={handleSort('id')}
                                >
                                    ID
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={
                                        column === 'name' ? direction : null
                                    }
                                    onClick={handleSort('name')}
                                >
                                    Name
                                </Table.HeaderCell>
                                <Table.HeaderCell>Detail</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data &&
                                data.Skill.map(d => (
                                    <Table.Row key={d.id}>
                                        <Table.Cell>{d.id}</Table.Cell>
                                        <Table.Cell>{d.name}</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/skills/${d.id}`}>
                                                Detail
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                )}
            </div>
        </Layout>
    );
}

const GET_SKILL = gql`
    query skillQuery($orderBy: [_SkillOrdering]) {
        Skill(orderBy: $orderBy) {
            _id
            id
            name
        }
    }
`;
