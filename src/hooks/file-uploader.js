import { useCallback, useState } from 'react';
import axios from 'axios';

export const useFileUploader = (url, { formDataName = 'uploaded_file', maxFiles = Infinity, acceptedFiles = '' }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const isSingleFile = maxFiles === 1

    const onDrop = useCallback((accepted, rejected) => {
        if (isSingleFile) {
            accepted = accepted.slice(0, 1);
        }

        if (accepted.length > maxFiles) {
            console.log(`Only ${maxFiles} files can be selected.`);
            accepted = accepted.slice(0, maxFiles);
        }

        setSelectedFiles(accepted);
    }, [isSingleFile, maxFiles]);

    const removeFile = useCallback(index => {
        setSelectedFiles(prevFiles => prevFiles.filter((file, i) => i !== index));
    }, []);

    const clearFiles = useCallback(() => {
        setSelectedFiles([]);
    }, []);

    const uploadFiles = useCallback(() => {
        const data = new FormData();

        selectedFiles.forEach((file, index) => {
            const name = isSingleFile ? formDataName : `file${index + 1}`;
            data.append(name, file);
        });

        axios.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        })
            .then(response => {
                console.log(response); 
                setSelectedFiles([]); // Clear selected files
                setUploadProgress(0); // Reset progress
            })
            .catch(error => {
                console.error(error);
                setUploadProgress(0); // Reset progress
            });
    }, [url, isSingleFile, formDataName, selectedFiles]);

    return { onDrop, uploadFiles, removeFile, clearFiles, selectedFiles, acceptedFiles, uploadProgress };
}
