import React from 'react';
import renderer from 'react-test-renderer';
import SearchPlatform from '../../components/class/searchPlatform';

it('snaps SearchPlatform with undefined props', () => {
	const tree = renderer
		.create(<SearchPlatform />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});