// Import global styles
import './App.css';

// Import React hooks
import { useCallback, useMemo, useState } from 'react';

// Import UI components and custom hooks
import StatsDisplay from './components/StatsDisplay';
import Button from './components/UI/Button';
import useStatsCalculator from './hooks/useStatsCalculator';
import useWebSocket from './hooks/useWebSocket';
import formatNumber from './utils/statsUtils';

function App() {
	// Predefined mock values for testing statistics calculation
	// const mockValues = useMemo(
	// 	() => [10, 20, 20, 30, 40, 50, 50, 50, 60, 70],
	// 	[],
	// );

	// App state: isStarted (WebSocket active), stats (current statistics), hasData (if any data received)
	const [isStarted, setIsStarted] = useState(false);
	const [stats, setStats] = useState(null);
	const [hasData, setHasData] = useState(false);

	// Custom hook for statistics calculation
	const statsCalculator = useStatsCalculator();

	// Custom hook for WebSocket connection and lost message tracking
	const { lostCount } = useWebSocket({
		url: isStarted ? 'wss://trade.termplat.com:8800/?password=1234' : null,
		onMessage: useCallback(
			(value) => {
				// Add incoming value to stats calculator and mark data as present
				statsCalculator.addValue(value);
				setHasData(true);
			},
			[statsCalculator],
		),
		onOpen: useCallback(() => {
			console.log('WebSocket connected');
		}, []),
		onClose: useCallback(() => {
			console.log('WebSocket disconnected');
		}, []),
		onError: useCallback((err) => {
			console.error('WebSocket error', err);
		}, []),
	});

	// Handler to start the WebSocket connection
	const handleStart = useCallback(() => {
		setIsStarted(true);
	}, []);

	// Handler to calculate and display statistics for received data
	const handleStats = useCallback(() => {
		const start = performance.now();
		const calculatedStats = statsCalculator.getStats();
		const end = performance.now();
		setStats({
			...calculatedStats,
			lostCount,
			calcTimeMs: formatNumber(end - start),
		});
	}, [statsCalculator, lostCount]);

	// Handler to add mock data, calculate stats, and display them
	// const handleMockData = useCallback(() => {
	// 	mockValues.forEach((v) => statsCalculator.addValue(v));
	// 	setHasData(true);
	// 	const start = performance.now();
	// 	const calculatedStats = statsCalculator.getStats();
	// 	const end = performance.now();
	// 	setStats({
	// 		...calculatedStats,
	// 		lostCount,
	// 		calcTimeMs: formatNumber(end - start),
	// 	});
	// }, [mockValues, statsCalculator, lostCount]);

	// Default stats object for initial render or when no data is present
	const defaultStats = useMemo(
		() => ({
			mean: 0,
			stdDev: 0,
			mode: 0,
			median: 0,
			lostCount: 0,
			calcTimeMs: 0,
		}),
		[],
	);

	// Render the main app UI
	return (
		<div className="app-container">
			<nav className="app-navigation">
				<Button onClick={handleStart} disabled={isStarted}>
					Start
				</Button>
				<Button onClick={handleStats} disabled={!isStarted || !hasData}>
					Statistics
				</Button>
				{/* <Button onClick={handleMockData}>Mock Data</Button> */}
			</nav>
			<StatsDisplay stats={stats || defaultStats} />
		</div>
	);
}

// Export the main App component
export default App;
