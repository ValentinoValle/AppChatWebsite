import { ReactNode, createContext, useContext, useReducer } from 'react';
import { useAuth } from './AuthContext';

interface ChatContextObject {
    data: any,
    dispatch: React.Dispatch<any>
}

export const ChatContext = createContext<ChatContextObject>({data: {chatId: 'null', user: {}}, dispatch: ()=>null});

interface Props {
    children?: ReactNode
}

export function useChat() {
    return useContext(ChatContext);
}

// export function singOutChat() {
//     const dispatch = useChat().dispatch;

//     dispatch({ type: 'CHANGE_USER', payload: 'null' })
// }

export const ChatContextProvider = ({ children }: Props) => {
    const currentUser = useAuth();
    const INITIAL_STATE = {
        chatId: 'null',
        user: {},
    };

    const chatReducer = (state: any, action: any) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    chatId: 
                        currentUser!.uid > action.payload.uid
                            ? currentUser!.uid + action.payload.uid
                            : action.payload.uid + currentUser!.uid
                };
            case 'SIGN_OUT':
                return {
                    user: {},
                    chatId: 'null',
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            { children }
        </ChatContext.Provider>
    )
};