import React from 'react';
import PropTypes from 'prop-types';
import InfoSection from './InfoSection';

const styles = {
    sectionWrapper: isSmallScreen => ({
        width: isSmallScreen ? '100%' : '60%'
    }),
    topSectionWrapper: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
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
    description: {
        fontSize: '15px',
        textAlign: 'justify'
    }
};

const LeftSection = ({
        description,
        isSmallScreen,
        summary,
        thumbnail,
        title
    }) => 
        <section style={styles.sectionWrapper(isSmallScreen)}>
            <h2>Main Info:</h2>
            <div style={styles.topSectionWrapper}>
                {!!thumbnail.length &&
                    <span style={{...styles.sectionWrapper, ...styles.titleWrapper}}>
                        <img alt={`${title} thumbnail`} src={thumbnail} height="60px"/>
                    </span>
                }
                {title && <span style={{...styles.sectionWrapper, ...styles.titleWrapper}}>
                    <h1 style={{}}>{title}</h1>
                </span>}
            </div>
            <div>
                {summary && <InfoSection text={summary} title="Summary" />}
                {description && <InfoSection text={description} title="About" />}
            </div>
        </section>



LeftSection.defaultProps = {
    description: '',
    thumbnail: '',
    isSmallScreen: false,
    summary: '',
    title: ''
};

LeftSection.propTypes = {
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    isSmallScreen: PropTypes.bool,
    summary: PropTypes.string,
    title: PropTypes.string
};

export default LeftSection;