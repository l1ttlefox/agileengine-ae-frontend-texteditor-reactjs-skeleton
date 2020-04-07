import React from 'react';
import './FileZone.css';

export const FileZone = ({ textValues, onWordClick, children }) => {
    const classes = (styles = []) => styles.join(' ');
    return (
        <div id="file-zone">
            <div id="file">
                <div>
                    {!!textValues.length &&
                    textValues.map(({ value, id, styles }) =>
                        <span
                            key={id}
                            onClick={() => onWordClick(value, id, styles)}
                            className={classes(styles)}
                        >{value}{" "}
                        </span>
                    )
                    }
                </div>
                { children }
            </div>
        </div>
    );
};

export default FileZone;
