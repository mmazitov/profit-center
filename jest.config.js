export const testEnvironment = 'jsdom';
export const moduleFileExtensions = ['js', 'jsx'];
export const testMatch = ['**/tests/**/*.(test|spec).(js|jsx)'];
export const transform = {
	'^.+\\.[jt]sx?$': 'babel-jest',
};
export const setupFilesAfterEnv = ['@testing-library/jest-dom/extend-expect'];
