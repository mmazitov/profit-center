/* eslint no-unused-vars: "off", unused-imports/no-unused-imports: "off" */
import React from 'react';
import { render } from '@testing-library/react';

import Button from '../src/components/UI/Button';

describe('Button', () => {
	it('renders children and handles click', () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Button onClick={handleClick}>Test</Button>);
		const btn = getByText('Test');
		btn.click();
		expect(handleClick).toHaveBeenCalled();
	});
	it('is disabled when disabled prop is true', () => {
		const { getByText } = render(<Button disabled>Disabled</Button>);
		expect(getByText('Disabled')).toBeDisabled();
	});
});
