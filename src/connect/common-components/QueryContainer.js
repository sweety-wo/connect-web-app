import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

export default function QueryContainer(props) {
    const [getDoc, docData] = useLazyQuery(props.query);
    const [data, setData] = useState();

    useEffect(() => {
        if (props.query) {
            getDoc();
        }
    }, [props.query, getDoc]);

    useEffect(() => {
        if (props.query && docData.data) {
            setData(docData.data);
        }
    }, [docData.data, props.query, setData]);

    if (docData.loading) {
        return <div>loading...</div>;
    }
    if (docData.error) {
        return <div>error...</div>;
    }
    return (
        <div>
            {React.cloneElement(props.children, {
                data,
                // getDocData: getDoc,
                setDocData: setData
            })}
        </div>
    );
}
