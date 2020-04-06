import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';
import { getSynonyms } from "./synonym.service";
import SynonymsList from './synonyms-list/SynonymsList'

class App extends Component {
    state = {
        text: '',
        styles: [],
        synonyms: []
    };

    async componentDidMount() {
        const result = await getMockText();
        this.setState({ text: result });
    }

    manageSelection = async (selection) => {
        const synonyms = await getSynonyms(selection);
        this.setState({ synonyms });
    };

    applyCommand = (style) => {
        this.setState({ styles: this.addStyle(style) });
        document.execCommand(style,false, null);
    };

    applySynonym = (synonym) => {
        document.execCommand('insertText', false, synonym);
    };

    checkSelectionState = () => {
        const buttonsState = ['bold', 'italic', 'underline'];
        let styles = [];
        buttonsState.forEach(style => {
            const queryCommandState = document.queryCommandState(style);
            if (queryCommandState) {
                styles.push(style);
            }
            this.setState({ styles });
        });
    };

    onAreaClick = async () => {
        const selection = document.getSelection().getRangeAt(0).toString();
        this.setState({styles: []});
        if(selection && selection.length) {
            this.checkSelectionState();
            await this.manageSelection(selection);
        }
    };

    addStyle = (style) => {
        const styles = this.state.styles;
        return styles.includes(style) ? styles : [ ...styles, style];
    };

    render() {
        const {text, synonyms, styles } = this.state;
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        styles={styles}
                        applyCommand={this.applyCommand}
                    />
                    <FileZone
                        text={text}
                        onAreaClick={this.onAreaClick}
                    >
                        {!!synonyms.length &&
                            <SynonymsList
                                synonyms={synonyms}
                                applySynonym={this.applySynonym}
                            />
                        }
                    </FileZone>
                </main>
            </div>
        );
    }
}

export default App;
