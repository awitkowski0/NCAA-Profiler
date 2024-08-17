const dummyUser = {
    username: 'devuser',
};

const dummyTokens = {
    access_token: 'dummy_access_token',
    refresh_token: 'dummy_refresh_token',
};

export const login = async (username: string, password: string): Promise<void> => {
    console.log(`Logging in with dummy user: ${username}`);
    localStorage.setItem('access_token', dummyTokens.access_token);
    localStorage.setItem('refresh_token', dummyTokens.refresh_token);
    return Promise.resolve();
};

export const register = async (username: string, password: string): Promise<void> => {
    console.log(`Registering with dummy user: ${username}`);
    return Promise.resolve();
};

export const getDummyUser = () => {
    return dummyUser;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    console.log('Logged out from dummy service');
};
