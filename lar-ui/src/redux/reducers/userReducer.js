// Mock user reducer - pre-populated for prototype (no MSAL auth needed)
const initialState = {
    username: "Demo User",
    isAdmin: true,
    token: "mock-token"
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN_USER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default userReducer;
