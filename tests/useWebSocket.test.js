import { renderHook } from '@testing-library/react';

import useWebSocket from '../src/hooks/useWebSocket';

describe('useWebSocket', () => {
	it('should initialize with correct default values', () => {
		const { result } = renderHook(() => useWebSocket({ url: null }));
		expect(result.current.isConnected).toBe(false);
		expect(result.current.lostCount).toBe(0);
		expect(typeof result.current.close).toBe('function');
	});
});
