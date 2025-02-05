import React from "react";
import useXmlManager from "../hooks/useXmlManager";
import XmlManagerUI from "./XmlManagerUI";

const XmlManager = () => {
    const {
        selectedFile,
        report,
        handleFileChange,
        handleUpload,
        handleFetchReport,
    } = useXmlManager();

    return (
        <XmlManagerUI
            selectedFile={selectedFile}
            report={report}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            handleFetchReport={handleFetchReport}
        />
    );
};

export default XmlManager;
