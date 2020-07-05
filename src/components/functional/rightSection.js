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

const RightSection = ({ results }) =>
    <section style={{ width: '40%' }}>
        <ul style={{ margin: '10px' }}>
            {results.map(i => <li style={styles.listItem}><a href={i.FirstURL} target="blank">{i.Text}</a></li>)}
        </ul>
    </section>


RightSection.defaultProps = {
    results: []
}

RightSection.propTypes = {
    results: PropTypes.array
}


export default RightSection;