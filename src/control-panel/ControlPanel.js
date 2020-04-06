import React from 'react';
import './ControlPanel.css';

export const ControlPanel = ({ applyCommand, styles }) =>  {
    return (
        <div id="control-panel">
            <div id="format-actions">
                <button
                    className={`format-action ${styles.includes('bold') ? 'active' : ''}`}
                    type="button"
                    onClick={() => applyCommand('bold')}
                ><b>B</b></button>
                <button
                    className={`format-action ${styles.includes('italic')? 'active' : ''}`}
                    type="button"
                    onClick={() => applyCommand('italic')}
                ><i>I</i></button>
                <button
                    className={`format-action ${styles.includes('underline')? 'active' : ''}`}
                    type="button"
                    onClick={() => applyCommand('underline')}
                ><u>U</u></button>
            </div>
        </div>
    );
};

export default ControlPanel;
