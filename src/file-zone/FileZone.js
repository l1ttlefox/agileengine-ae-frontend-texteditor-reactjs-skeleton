import React from 'react';
import './FileZone.css';

export const FileZone = ({ onAreaClick, text, children }) => {
    return (
        <div id="file-zone">
            <div id="file">
                <div
                    contentEditable
                    suppressContentEditableWarning
                    onClick={async () => await onAreaClick()}
                >
                    { text }
                </div>
                { children }
            </div>
        </div>
    );
};

export default FileZone;
