import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import './import.scss';

export default function Import() {
    const [selectedFile, setSelectedFile] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = React.createRef();

    // On file select (from the pop up)
    const onFileChange = event => {
        // Update the state
        setSelectedFile(event.target.files[0]);
    };

    // On file upload (click the upload button)
    const onFileUpload = () => {
        setIsLoading(true);

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append('excel-file', selectedFile, selectedFile.name);

        // Request made to the backend api
        // Send formData object
        axios
            .post(process.env.REACT_APP_API_URL + '/import', formData)
            .then(() => {
                setSelectedFile(null);
                setIsLoading(false);
                toastr.info('Data imported', 'Data successfully imported');
            })
            .catch(() => {
                setIsLoading(false);
                toastr.error('Error', 'Data import failed');
            });
    };

    // File content to be displayed after
    // file upload is complete
    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h2 style={{ marginTop: '10px' }}>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:{' '}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <h4 style={{ marginTop: '10px' }}>Choose file to Import</h4>
                </div>
            );
        }
    };

    return (
        <Layout shouldAuth>
            <div className="import">
                <h1>Import</h1>
                <div>
                    <Button
                        className="ui import__button button"
                        content="Choose File"
                        labelPosition="left"
                        icon="file"
                        onClick={() => fileInputRef.current.click()}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={onFileChange}
                    />
                    <Button
                        className={`ui secondary ${isLoading && 'loading'}`}
                        disabled={!selectedFile}
                        onClick={onFileUpload}
                    >
                        Import
                    </Button>
                </div>
                {fileData()}
            </div>
        </Layout>
    );
}
