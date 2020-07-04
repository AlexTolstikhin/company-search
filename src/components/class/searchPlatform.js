import React, { PureComponent } from 'react';
import * as APIs from '../../searchAPIs/searchAPIs';



const inlineStyles = {
    inputWrapper: {
        display: 'flex',
        height: '200px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '600px',
        height: '30px',
        borderRadius: '15px',
    },
    submitButton: {
        fontWeight: 700,
        cursor: 'pointer',
        height: '35px',
        margin: '15px',
        borderRadius: '15px',
        width: '100px'
    },
    resultsWrapper: {
        display: 'flex',
        padding: '0 400px'
    },
    showMeBorders: {
        border: '1px solid grey'
    },
    list: {
        width: '100%',
        paddingInlineStart: '0',
        listStyleType: 'none'
    },
    listItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100px',
        marginTop: '20px',
        padding: '20px',
        width: '100%',
        listStyleType: 'none'
    }
}


export default class SearchPlatform extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            queryString: ''
        }
    }


    onInputChange = ({ target: { value } }) => {
        this.setState({ queryString: value.charAt(0).toUpperCase() + value.slice(1) }) 
    }


    onSearchSubmit = (e) => {
        e.preventDefault();
        const { queryString } = this.state;
        const { fetch } = APIs;
        fetch(queryString).then(resp => {
            const [wiki] = resp;
            this.formatWikiData(wiki);
        })
    }


    formatWikiData = (data) => {
        debugger;
    }


    render() {
        const { queryString } = this.state;
        return (
            <div>
                <div style={{...inlineStyles.showMeBorders, ...inlineStyles.inputWrapper}}>
                    <form onSubmit={!!queryString.length ? (event) => this.onSearchSubmit(event) : e => e.preventDefault()}>
                        <input
                            style={inlineStyles.input}
                            onChange={event => this.onInputChange(event)} 
                            type="text"
                            value={queryString}
                        />
                        <button
                            style={inlineStyles.submitButton}
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div style={{...inlineStyles.showMeBorders, ...inlineStyles.resultsWrapper}}>
                    <ul style={inlineStyles.list}>
                        <li style={{...inlineStyles.showMeBorders, ...inlineStyles.listItem}}>Results</li>
                        <li style={{...inlineStyles.showMeBorders, ...inlineStyles.listItem}}>Results</li>
                    </ul>
                </div>
            </div>
        )
    }
}