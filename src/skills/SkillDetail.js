import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from '../layout/Layout';
import { Loader, Segment, Button } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';
import './SkillDetail.scss';

export default function SkillDetail() {
    const { id } = useParams();
    const { loading, data, error } = useQuery(GET_SKILL, {
        variables: {
            id
        }
    });
    const history = useHistory();

    return (
        <Layout shouldAuth>
            <div className="skill">
                <div className="skill__title">
                    <h1>Skill Detail</h1>
                </div>
                {loading ? (
                    <Loader active />
                ) : error ? (
                    <Segment>There was an error while getting data</Segment>
                ) : (
                    <div className="skill-detail">
                        <div className="skill-detail__meta">
                            <div>ID</div>
                            <div>{data.Skill[0].id}</div>
                            <div>Name</div>
                            <div>{data.Skill[0].name}</div>
                        </div>
                        <h2>Processes</h2>
                        <ul className="skill-detail__list">
                            {data.Skill[0].processes.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                        <h2>People</h2>
                        <ul className="skill-detail__list">
                            {data.Skill[0].people.map(s => (
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

const GET_SKILL = gql`
    query skillQuery($id: ID) {
        Skill(id: $id) {
            id
            name
            processes {
                id
                name
            }
            people {
                id
                name
            }
        }
    }
`;
