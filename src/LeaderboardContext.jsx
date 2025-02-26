import { createContext, useReducer, useContext } from "react"

const LeaderboardContext = createContext()

const LeaderboardReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SCORE':
            return state.map((entry) =>
                entry.name === action.payload.name
                    ? { ...entry, score: entry.score + action.payload.score }
                    : entry
            ).concat(
                state.some(entry => entry.name === action.payload.name)
                    ? []
                    : [{ name: action.payload.name, score: action.payload.score }]

            )
        default:
            return state
    }
}

export const LeaderboardProvider = ({ children }) => {
    const [Leaderboard, dispatch ] = useReducer(LeaderboardReducer, [])

    return (
        <LeaderboardContext.Provider value={{ Leaderboard, dispatch }}>
        {children}
        </LeaderboardContext.Provider>
    )
}

export const useLeaderboard = () => useContext(LeaderboardContext)