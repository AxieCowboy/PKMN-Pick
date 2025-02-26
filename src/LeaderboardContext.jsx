import { createContext, useReducer, useContext } from "react"

const LeaderboardContext = createContext()

const LeaderboardReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SCORE': {
            const existingEntry = state.find(entry => entry.name === action.payload.name)
            if (existingEntry) {
                return state.map(entry =>
                    entry.name === action.payload.name
                        ? { ...entry, score: entry.score + action.payload.score }
                        : entry
                )
            } else {
                return [...state, { name: action.payload.name, score: action.payload.score }]
            }
        }
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