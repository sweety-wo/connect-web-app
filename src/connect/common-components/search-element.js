import { Form, Input } from 'semantic-ui-react';
import React from 'react';

const SearchElement = ({ onSearch, type, label, index }) => {
    return (
        <Form>
            <Form.Group widths="equal">
                <Form.Field>
                    <Input
                        label={label}
                        icon="search"
                        placeholder="Search..."
                        fluid
                        onChange={(e, val) => onSearch(val.value)}
                    />
                </Form.Field>
            </Form.Group>
        </Form>
    );
};
export default SearchElement;
