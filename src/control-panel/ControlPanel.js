import React, { useCallback, useMemo } from "react";
import "./ControlPanel.css";

export const ControlPanel = ({ applyStyle, selectedStyles }) => {
    const defineActiveClass = (style) => useMemo(
        () => `format-action${selectedStyles.includes(style) ? " active" : ""}`,
        [selectedStyles]
    );

    const onApplyStyle = useCallback((style) => () => applyStyle(style), [applyStyle]);

    return (
        <div className="control-panel">
            <div className="format-actions">
                <button className={defineActiveClass('bold')} type="button" onClick={onApplyStyle('bold')}>
                    <b>B</b>
                </button>
                <button className={defineActiveClass('italic')} type="button" onClick={onApplyStyle('italic')}>
                    <i>I</i>
                </button>
                <button
                    className={defineActiveClass('underline')} type="button" onClick={onApplyStyle('underline')}>
                    <u>U</u>
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;
