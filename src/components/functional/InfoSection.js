import React from 'react';
import PropTypes from 'prop-types';


const styles = {
    infoSection: {
        borderRadius: '15px',
        fontSize: '15px',
        lineHeight: '20px',
        textAlign: 'justify',
        background: '#c7ede9',
        padding: '10px 20px 20px 20px',
        margin: '10px'
    }
}

const InfoSection = ({ text, title}) => 
    <div style={styles.infoSection}>
        <h2>{title}</h2>
        <hr />
        <div>{text}</div>
    </div>

InfoSection.defaultProps = {
    text: '',
    title: ''
};

InfoSection.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string
};


export default InfoSection;