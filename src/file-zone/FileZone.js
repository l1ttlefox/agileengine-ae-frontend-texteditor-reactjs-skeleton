import React, { useCallback } from 'react';
import './FileZone.css';

export const FileZone = ({ textValues, onWordClick, children }) => {
    const generateClasses = useCallback((styles = []) => styles.join(' '), []);
    const handleWordClick = useCallback(({ value, id, styles }) => () => onWordClick(value, id, styles), []);

    return (
        <div className="file-zone">
            <div className="file">
                {!!textValues.length &&
                    <div>
                        {
                            textValues.map(({ value, id, styles }) =>
                                <span
                                    key={id}
                                    onClick={handleWordClick({ value, id, styles })}
                                    className={generateClasses(styles)}
                                >
                                    {value}{" "}
                                </span>
                            )
                        }
                    </div>
                }
                {children}
            </div>
        </div>
    );
};

export default FileZone;
