import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from '../layout/Layout';
import { Loader, Segment, Button } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';
import './PeopleDetail.scss';

export default function PeopleDetail() {
    const { id } = useParams();
    const { loading, data, error } = useQuery(GET_PERSON, {
        variables: {
            id
        }
    });
    const history = useHistory();

    return (
        <Layout shouldAuth>
            <div className="person">
                <div className="person__title">
                    <h1>Person Detail</h1>
                </div>
                {loading ? (
                    <Loader active />
                ) : error ? (
                    <Segment>There was an error while getting data</Segment>
                ) : (
                    <div className="person-detail">
                        <div className="person-detail__meta">
                            <div>ID</div>
                            <div>{data.Person[0].id}</div>
                            <div>Name</div>
                            <div>{data.Person[0].name}</div>
                        </div>
                        <h2>Skills</h2>
                        <ul className="person-detail__list">
                            {data.Person[0].skills.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                        <h2>Pre-requisites</h2>
                        <ul className="person-detail__list">
                            {data.Person[0].prerequisites.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Button onClick={() => history.goBack()}>Back</Button>
            </div>
        </Layout>
    );
}

const GET_PERSON = gql`
    query personQuery($id: ID) {
        Person(id: $id) {
            id
            name
            skills {
                id
                name
            }
            prerequisites {
                id
                name
            }
        }
    }
`;
