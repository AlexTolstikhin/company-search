import React from 'react';
import renderer from 'react-test-renderer';
import InfoSection from '../../components/functional/InfoSection';

it('snaps InfoSection with undefined props', () => {
	const tree = renderer
		.create(<InfoSection />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('snaps InfoSection with defined props', () => {
	const tree = renderer
		.create(<InfoSection title="foo" text="loo" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});