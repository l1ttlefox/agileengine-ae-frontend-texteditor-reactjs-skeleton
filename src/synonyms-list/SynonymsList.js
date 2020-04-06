import React from 'react';

export const SynonymsList = ({ synonyms, applySynonym }) => (
    <div>
        <ul>
            {synonyms.map(({ word }, i) =>
                <li key={`synonym-${i}`}>
                    <button onClick={() => applySynonym(word)}>{word}</button>
                </li>
            )}
        </ul>
    </div>
);

export default SynonymsList;
