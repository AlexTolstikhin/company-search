import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    showMeBorders: {
        // border: '1px solid grey'
    },
    sectionWrapper: isSmallScreen => ({
        width: isSmallScreen ? '100%' : '60%'
    }),
    titleWrapper: {
        width: '100%',
        borderRadius: '15px',
        margin: '10px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#c7ede9',
    },
    textWrapper: {
        borderRadius: '15px',
        fontSize: '15px',
        lineHeight: '20px',
        textAlign: 'justify',
        background: '#c7ede9',
        padding: '10px 20px 20px 20px',
        margin: '10px'
    },
    description: {
        fontSize: '15px',
        textAlign: 'justify'
    }
};


const textComponent = (title, text) => 
    <div style={styles.textWrapper}>
        <h2>{title}</h2>
        <hr />
        <div>{text}</div>
    </div>

const LeftSection = ({
        description,
        images,
        isSmallScreen,
        summary,
        title,
    }) => 
        <section style={{...styles.showMeBorders, ...styles.sectionWrapper(isSmallScreen)}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!!images.length &&
                    <span style={{...styles.sectionWrapper, ...styles.titleWrapper}}>
                        <img src={images[0]} height="50px"/>
                    </span>
                }
                {title && <span style={{...styles.sectionWrapper, ...styles.titleWrapper}}>
                    <h1 style={{}}>{title}</h1>
                </span>}
            </div>
            <div>
                {summary && textComponent('Summary', summary)}
                {description && textComponent('About', description)}
            </div>
        </section>



LeftSection.defaultProps = {
    description: '',
    images: [],
    isSmallScreen: false,
    summary: '',
    title: ''
};

LeftSection.propTypes = {
    description: PropTypes.string,
    images: PropTypes.array,
    isSmallScreen: PropTypes.bool,
    summary: PropTypes.string,
    title: PropTypes.string
};

export default LeftSection;