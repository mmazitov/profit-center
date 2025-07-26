/* eslint no-unused-vars: "off", unused-imports/no-unused-imports: "off" */
import React from 'react';
import { render } from '@testing-library/react';

import StatsDisplay from '../src/components/StatsDisplay';

describe('StatsDisplay', () => {
	it('renders stats correctly', () => {
		const stats = {
			mean: 10,
			stdDev: 2,
			mode: 10,
			median: 10,
			lostCount: 0,
			calcTimeMs: 1.23,
		};
		const { getByText } = render(<StatsDisplay stats={stats} />);
		expect(getByText(/Mean: 10/)).toBeInTheDocument();
		expect(getByText(/Standard Deviation: 2/)).toBeInTheDocument();
		expect(getByText(/Mode: 10/)).toBeInTheDocument();
		expect(getByText(/Median: 10/)).toBeInTheDocument();
		expect(getByText(/Lost quotes: 0/)).toBeInTheDocument();
		expect(getByText(/Calculation time: 1.23 ms/)).toBeInTheDocument();
	});
});
