import React, { PureComponent } from 'react';
import * as APIs from '../../searchAPIs/searchAPIs';

// components
import LeftSection from '../functional/leftSection';
import RightSection from '../functional/rightSection';

const inlineStyles = {
    inputWrapper: {
        display: 'flex',
        height: '200px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: '15px',
        paddingLeft: '10px',
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
        padding: '0 100px'
    },
    showMeBorders: {
        // border: '1px solid grey'
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
            queryString: '',
            leftSectionData: {},
            rightSectionData: []
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
            const [wikiData, duckDuckGo] = resp;
            this.setState({
                leftSectionData: wikiData,
                rightSectionData: duckDuckGo
            })
        })
    }

    render() {
        const {
            leftSectionData: {
                description = '',
                title = '',
                summary = '',
                images = []
            },
            rightSectionData = [],
            queryString
        } = this.state;
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
                    <LeftSection
                        description={description}
                        images={images}
                        summary={summary}
                        title={title}
                    />
                    <RightSection
                        results={rightSectionData}
                    />
                </div>
            </div>
        )
    }
}