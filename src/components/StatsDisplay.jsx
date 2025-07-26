/* eslint no-unused-vars: "off", unused-imports/no-unused-imports: "off" */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// Component for displaying statistical results in a formatted block
const StatsDisplay = ({ stats }) => {
	// Memoize the rendered content to avoid unnecessary re-renders
	const content = useMemo(() => {
		// If no stats are provided, render nothing
		if (!stats) return null;
		// Render a block with all statistics
		return (
			<div className="stats-block">
				<p>Mean: {stats.mean}</p>
				<p>Standard Deviation: {stats.stdDev}</p>
				<p>Mode: {stats.mode}</p>
				<p>Median: {stats.median}</p>
				<p>Lost quotes: {stats.lostCount}</p>
				<p>Calculation time: {stats.calcTimeMs} ms</p>
			</div>
		);
	}, [stats]);
	// Return the memoized content
	return content;
};

// Define expected prop types for the StatsDisplay component
StatsDisplay.propTypes = {
	stats: PropTypes.shape({
		mean: PropTypes.number,
		stdDev: PropTypes.number,
		mode: PropTypes.number,
		median: PropTypes.number,
		lostCount: PropTypes.number,
		calcTimeMs: PropTypes.number,
	}),
};

export default StatsDisplay;
