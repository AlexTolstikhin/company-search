import React from 'react';
import renderer from 'react-test-renderer';
import RightSection from '../../components/functional/rightSection';

it('snaps RightSection with undefined props', () => {
	const tree = renderer
		.create(<RightSection />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});


it('snaps RightSection with defined props', () => {
	const dummyData = {
		FirstURL: 'fuf',
		Text: 'luf'
	}
	const tree = renderer
		.create(<RightSection isSmallScreen results={[dummyData]}/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});