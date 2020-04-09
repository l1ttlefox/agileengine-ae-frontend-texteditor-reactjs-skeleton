import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';
import { getSynonyms } from "./synonym.service";
import SynonymsList from './synonyms-list/SynonymsList'

const App = () => {
    const [textValues, setTextValues] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [synonyms, setSynonyms] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [textMap] = useState(new Map());

    useEffect(() => {
        async function initializeText() {
            const result = await getMockText();
            const wordsList = result.split(' ');
            wordsList.forEach((value, i) => {
                const id = `${value}-${i}`;
                textMap.set(id, { value, id, styles: [] })
            });

            setTextValues([...textMap.values()]);
        }

        initializeText();
    }, []);

    const onWordClick = useCallback(async (word, id, styles) => {
        setSelectedId(id);
        setSelectedStyles(styles);
        setSynonyms(await getSynonyms(word));
    }, []);

    const applyStyle = useCallback((style) => {
        const selectedElement = textMap.get(selectedId);
        const styles = selectedElement.styles.includes(style)
            ? selectedElement.styles.filter(s => s !== style)
            : [...selectedElement.styles, style];
        textMap.set(selectedId, { ...selectedElement, styles });
        setTextValues([...textMap.values()]);
        setSelectedStyles(styles)
    }, [selectedId]);

    const applySynonym = useCallback((synonym) => {
        const selectedElement = textMap.get(selectedId);
        textMap.set(selectedId, { ...selectedElement, value: synonym });
        setTextValues([...textMap.values()]);
    }, [selectedId]);

    return (
        <div className="App">
            <header>
                <span>Simple Text Editor</span>
            </header>
            <main>
                <ControlPanel
                    selectedStyles={selectedStyles}
                    applyStyle={applyStyle}
                />
                <FileZone
                    textValues={textValues}
                    onWordClick={onWordClick}
                >
                    {!!synonyms.length &&
                        <SynonymsList
                            applySynonym={applySynonym}
                            synonyms={synonyms}
                        />
                    }
                </FileZone>
            </main>
        </div>
    );
};

export default App;
