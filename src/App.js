import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';
import { getSynonyms } from "./synonym.service";
import SynonymsList from './synonyms-list/SynonymsList'

class App extends Component {
    state = {
        textValues: [],
        selectedStyles: [],
        synonyms: []
    };
    textMap = new Map();

    async componentDidMount() {
        const result = await getMockText();
        const wordsList = result.split(' ');
        wordsList.forEach((value, i) => {
            const id = `${value}-${i}`;
            this.textMap.set(id, { value, id, styles: [] })
        });

        this.setState({ textValues: [ ...this.textMap.values()] })
    }

    onWordClick = async (word, id, selectedStyles) => {
        this.setState({ selected: word, selectedId: id, selectedStyles });
        await this.getSynonyms(word);
    };

    applyStyle = (style) =>  {
        const selectedElement = this.textMap.get(this.state.selectedId);
        this.textMap.set(this.state.selectedId, { ...selectedElement, styles: this.addStyle(selectedElement.styles, style) });
        this.setState({ textValues: [ ...this.textMap.values()], selectedStyles: this.addStyle(selectedElement.styles, style) })
    };

    addStyle = (styles, style) => {
        return styles.includes(style) ? styles.filter(s => s !== style) : [...styles, style];
    };

    getSynonyms = async (word) => {
        const synonyms = await getSynonyms(word);
        this.setState({ synonyms });
    };

    applySynonym = (synonym) => {
        const selectedElement = this.textMap.get(this.state.selectedId);
        this.textMap.set(this.state.selectedId, { ...selectedElement, value: synonym });
        this.setState({ textValues: [...this.textMap.values()] })
    };

    render() {
        const { textValues, synonyms, selectedStyles } = this.state;
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        selectedStyles={selectedStyles}
                        applyStyle={this.applyStyle}
                    />
                    <FileZone
                        textValues={textValues}
                        onWordClick={this.onWordClick}
                    >
                        {!!synonyms.length &&
                            <SynonymsList
                                applySynonym={this.applySynonym}
                                synonyms={synonyms}
                            />
                        }
                    </FileZone>
                </main>
            </div>
        );
    }
}

export default App;
