import React from 'react';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const styles = {
    showMeBorders: {
        border: '1px solid grey'
    },
    sectionWrapper: {
        width: '50%'
    },
    imageWrapper: {
        
    }
};

const LeftSection = ({
        description,
        images,
        summary,
        title
    }) => 
        <div style={{...styles.showMeBorders, ...styles.sectionWrapper}}>
            {!!images.length && <div><img src={images[0]} /></div>}
            <h1>{title}</h1>
            <p>{summary}</p>
            <p>{description}</p>
        </div>



LeftSection.defaultProps = {
    description: '',
    images: [],
    summary: '',
    title: ''
};

LeftSection.propTypes = {
    description: PropTypes.string,
    images: PropTypes.array,
    summary: PropTypes.string,
    title: PropTypes.string
};

export default LeftSection;