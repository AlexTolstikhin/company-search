import React, { PureComponent } from 'react';
import * as APIs from '../../searchAPIs/searchAPIs';

// components
import LeftSection from '../functional/leftSection';

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
        padding: '0 100px'
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
            queryString: '',
            leftSectionData: {}
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
                leftSectionData: wikiData
            })
            console.log(duckDuckGo)
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
            queryString
        } = this.state;
        console.log(images)
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
                    <div>Right Section</div>
                </div>
            </div>
        )
    }
}