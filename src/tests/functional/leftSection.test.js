import React from 'react';
import renderer from 'react-test-renderer';
import LeftSection from '../../components/functional/leftSection';

it('snaps LeftSection with undefined props', () => {
	const tree = renderer
		.create(<LeftSection />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('snaps LeftSection with defined props', () => {
	const tree = renderer
		.create(<LeftSection 
			description='fuf'
			isSmallScreen
			summary='fuf'
			thumbnail='fuf'
			title='fuf'
		/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});