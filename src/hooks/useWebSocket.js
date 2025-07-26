import { useEffect, useRef, useState } from 'react';

// Custom React hook for managing a WebSocket connection with auto-reconnect and lost message tracking.
const useWebSocket = ({ onMessage, onOpen, onClose, onError, url }) => {
	// Ref to the WebSocket instance (persists across renders)
	const ws = useRef(null);
	// Tracks if the WebSocket is currently connected
	const [isConnected, setIsConnected] = useState(false);
	// Tracks the number of lost messages (based on message IDs)
	const [lostCount, setLostCount] = useState(0);
	// Stores the previous message ID to detect gaps
	const prevId = useRef(null);
	// Ref to the reconnect timeout (so it can be cleared on cleanup)
	const reconnectTimeout = useRef(null);

	useEffect(() => {
		if (!url) return;

		// Function to establish a WebSocket connection
		function connect() {
			ws.current = new WebSocket(url);

			// Handle successful connection
			ws.current.onopen = () => {
				setIsConnected(true);
				if (onOpen) onOpen();
			};

			// Handle incoming messages
			ws.current.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					// If message IDs are present, check for lost messages
					if (data.id != null && prevId.current != null) {
						const lost = data.id - prevId.current - 1;
						if (lost > 0) {
							setLostCount((prev) => prev + lost);
						}
					}
					// Update previous ID
					prevId.current = data.id;

					// Call the onMessage callback with the value
					if (onMessage) onMessage(data.value);
				} catch (e) {
					console.error('Error parsing message', e);
				}
			};

			// Handle connection close (with auto-reconnect)
			ws.current.onclose = () => {
				setIsConnected(false);
				if (onClose) onClose();
				// Attempt to reconnect after 2 seconds if URL is still set
				if (url) {
					reconnectTimeout.current = setTimeout(() => {
						connect();
					}, 2000);
				}
			};

			// Handle connection errors
			ws.current.onerror = (err) => {
				console.error('WebSocket error:', err);
				if (onError) onError(err);
			};
		}

		connect();

		// Cleanup on unmount or URL change
		return () => {
			if (reconnectTimeout.current) {
				clearTimeout(reconnectTimeout.current);
			}
			ws.current && ws.current.close();
		};
	}, [url]);

	// Expose connection state, lost message count, and a manual close function
	return {
		isConnected,
		lostCount,
		close: () => ws.current && ws.current.close(),
	};
};

export default useWebSocket;
