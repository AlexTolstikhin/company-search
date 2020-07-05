import React from 'react';
import PropTypes from 'prop-types';


const styles = {
    listItem: {
        borderRadius: '15px',
        margin: '10px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#c7ede9',
    }
};

const RightSection = ({ isSmallScreen, results }) =>
    <section style={{ width: isSmallScreen ? '100%' : '40%' }}>
        <ul style={{ margin: '10px' }}>
            {results.map((item, index) => <li key={index} style={styles.listItem}><a href={item.FirstURL} target="blank">{item.Text}</a></li>)}
        </ul>
    </section>


RightSection.defaultProps = {
    results: [],
    isSmallScreen: false
}

RightSection.propTypes = {
    results: PropTypes.array,
    isSmallScreen: PropTypes.bool
}


export default RightSection;