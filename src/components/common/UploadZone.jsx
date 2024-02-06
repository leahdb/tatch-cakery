import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFileUploader } from "../../hooks/file-uploader";

function UploadZone({api_endpoint, max_files = 1}) {
    const {
      onDrop,
      uploadFiles,
      removeFile,
      clearFiles,
      selectedFiles,
      acceptedFiles,
      uploadProgress,
    } = useFileUploader(api_endpoint, {
      maxFiles: max_files,
      formDataName: "import_file"
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: acceptedFiles,
        maxFiles: max_files
    });

    return (
        <div>
            <div {...getRootProps()}
                 className={"border-1 p-1 bg-lightgray mb-2 d-flex rounded-3 flex-column align-items-start"}>
                <input {...getInputProps()} />

                <div className="d-flex full-width flex-column scrollableY max-height-300">
                    {selectedFiles.map((file, index) => (
                        <div className={"d-flex gap-1 flex-row bg-white border-bottom rounded-2 p-1 flex-grow-1 align-items-center"} key={index}>
                            <div className={"p-3 border-right-grey"}>icon</div>
                            <p className={"p-2 m-0 flex-grow-1"} key={index}>{file.path}</p>
                            <button className={"btn text-danger"} onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index)
                            }}>remove</button>
                        </div>
                    ))}
                </div>

                <div className={"d-flex align-items-center justify-content-center full-width p-3"}>
                    <p className={"m-0"}>
                        {isDragActive ? "Drop the files here ..." : "Press or Drag your files here"}
                    </p>
                </div>
            </div>
            <button className={"btn btn-primary full-width"} onClick={uploadFiles}>Upload Files</button>
            <div className="d-flex justify-content-end mb-1 p-1">
                <button className={"btn"} onClick={clearFiles}>Clear Files</button>
            </div>
            {uploadProgress > 0 && <progress max="100" value={uploadProgress}>{uploadProgress}%</progress>}
        </div>
    )
}

export default UploadZone;
