import React from 'react';
import './ControlPanel.css';

export const ControlPanel = ({ applyStyle, selectedStyles }) =>  {
    return (
        <div id="control-panel">
            <div id="format-actions">
                <button
                    className={`format-action ${selectedStyles.includes('bold') ? 'active' : ''}`}
                    type="button"
                    onClick={() => applyStyle('bold')}
                ><b>B</b></button>
                <button
                    className={`format-action ${selectedStyles.includes('italic') ? 'active' : ''}`}
                    type="button"
                    onClick={() => applyStyle('italic')}
                ><i>I</i></button>
                <button
                    className={`format-action ${selectedStyles.includes('underline') ? 'active' : ''}`}
                    type="button"
                    onClick={() => applyStyle('underline')}
                ><u>U</u></button>
            </div>
        </div>
    );
};

export default ControlPanel;
