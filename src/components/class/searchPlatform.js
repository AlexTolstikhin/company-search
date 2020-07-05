import React, { PureComponent } from 'react';

// APIs
import * as APIs from '../../searchAPIs/searchAPIs';

// Components
import LeftSection from '../functional/leftSection';
import RightSection from '../functional/rightSection';

// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

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
    },
    resultsWrapper: isSmallScreen => ({
        display: 'flex',
        flexWrap: 'wrap',
        padding: isSmallScreen ? '20px' : '0 100px'
    }),
    submitButton: {
        fontWeight: 700,
        cursor: 'pointer',
        height: '35px',
        margin: '15px',
        borderRadius: '15px',
        width: '100px'
    }
}


export default class SearchPlatform extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: false,
            queryString: '',
            leftSectionData: {},
            rightSectionData: [],
            thumbnail: '',
            isSmallScreen: window.innerWidth < 800
        }
    }

    componentDidMount() {
        window.addEventListener && window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.addEventListener && window.removeEventListener('resize', this.updateDimensions);
    }

    /**
     * Helper method that capitalizes query string.
     * For cleaner company names results
     * @param {string} string 
     */
    capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

    /**
     * Hepler method that replaces spaces with underscore
     * @param {string} string 
     */
    replaceWhiteSpace = string => string.replace(' ', '_');

    /**
     * Event listener method called on screen resize
     */
    updateDimensions = () => this.setState({ isSmallScreen: window.innerWidth < 800 })

    /**
     * Input change handler
     * @param {event} event
     */
    onInputChange = ({ target: { value } }) => {
        this.setState({ queryString: value }) 
    }

    /**
     * Handle submit event => Calls fetch API and handles state
     * @param {event} event
     */
    onSearchSubmit = (e) => {
        e.preventDefault();
        const { queryString } = this.state;
        const { fetch } = APIs;
        this.setState({
            loading: true,
            error: false
        },() => fetch(this.capitalize(queryString))
            .then(resp => {
                const [wikiData, duckDuckGo, thumbnail] = resp;
                this.setState({
                    leftSectionData: wikiData,
                    rightSectionData: duckDuckGo,
                    thumbnail: thumbnail,
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    leftSectionData: {},
                    rightSectionData: [],
                    thumbnail: '',
                    loading: false,
                    error: true
                })
            })
        );
    }

    render() {
        const {
            error,
            isSmallScreen,
            leftSectionData,
            leftSectionData: {
                extract = '',
                title = '',
                description = '',
            },
            loading,
            queryString,
            rightSectionData = [],
            thumbnail
        } = this.state;

        return (
            <div>
                <div style={inlineStyles.inputWrapper}>
                    <form onSubmit={!!queryString.length ? (event) => this.onSearchSubmit(event) : e => e.preventDefault()}>
                        <input
                            onChange={event => this.onInputChange(event)} 
                            style={inlineStyles.input(isSmallScreen)}
                            data-testid="input-element"
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
                {loading && 
                    <Loader
                        color="#c7ede9"
                        height={100}
                        timeout={3000}
                        type="ThreeDots"
                        width={100}
                    />
                }
                {error && <h3>Ooops, something went wrong, we couldn't find any results...</h3>}
                {!loading && <div style={inlineStyles.resultsWrapper(isSmallScreen)}>
                    {!!Object.keys(leftSectionData).length && <LeftSection
                        description={extract}
                        isSmallScreen={isSmallScreen}
                        summary={description}
                        thumbnail={thumbnail}
                        title={title}
                    />}
                    {!!rightSectionData.length && <RightSection
                        isSmallScreen={isSmallScreen}
                        results={rightSectionData}
                    />}
                </div>}
            </div>
        )
    }
}