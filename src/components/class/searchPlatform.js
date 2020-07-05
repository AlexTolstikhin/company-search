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
    input: isSmallScreen => ({
        fontSize: '15px',
        paddingLeft: '10px',
        width: isSmallScreen ? '100%' : '600px',
        height: '30px',
        borderRadius: '15px',
    }),
    submitButton: {
        fontWeight: 700,
        cursor: 'pointer',
        height: '35px',
        margin: '15px',
        borderRadius: '15px',
        width: '100px'
    },
    resultsWrapper: isSmallScreen => ({
        display: 'flex',
        flexWrap: 'wrap',
        padding: isSmallScreen ? '20px' : '0 100px'
    }),
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
            rightSectionData: [],
            isSmallScreen: window.innerWidth < 800
        }
    }

    componentDidMount() {
        window.addEventListener && window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.addEventListener && window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => this.setState({ isSmallScreen: window.innerWidth < 800 })

    onInputChange = ({ target: { value } }) => {
        this.setState({ queryString: value.charAt(0).toUpperCase() + value.slice(1) }) 
    }

    onSearchSubmit = (e) => {
        e.preventDefault();
        const { queryString } = this.state;
        const { fetch } = APIs;
        fetch(queryString)
            .then(resp => {
                const [wikiData, duckDuckGo] = resp;
                this.setState({
                    leftSectionData: wikiData,
                    rightSectionData: duckDuckGo
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {
            leftSectionData: {
                extract = '',
                title = '',
                description = '',
                images = []
            },
            rightSectionData = [],
            isSmallScreen,
            queryString
        } = this.state;
        return (
            <div>
                <div style={{...inlineStyles.showMeBorders, ...inlineStyles.inputWrapper}}>
                    <form onSubmit={!!queryString.length ? (event) => this.onSearchSubmit(event) : e => e.preventDefault()}>
                        <input
                            style={inlineStyles.input(isSmallScreen)}
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
                <div style={{...inlineStyles.showMeBorders, ...inlineStyles.resultsWrapper(isSmallScreen)}}>
                    <LeftSection
                        description={extract}
                        images={images}
                        isSmallScreen={isSmallScreen}
                        summary={description}
                        title={title}
                    />
                    <RightSection
                        results={rightSectionData}
                        isSmallScreen={isSmallScreen}
                    />
                </div>
            </div>
        )
    }
}