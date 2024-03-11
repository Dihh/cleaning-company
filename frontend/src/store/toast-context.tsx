import { FC, createContext, useState } from 'react'

export type ToastContextProps = {
    setShowToast: any
    showToast: any
}

export const ToastContextValue = {
    setShowToast: () => { },
    showToast: {},
}


export const ToastContext = createContext<ToastContextProps>(ToastContextValue);

type props = {
    children: any
}
const ToastContextProvider: FC<props> = ({ children }) => {
    const [showToast, setShowToast] = useState({ condition: false, type: '', message: '' });

    const ctxClients: ToastContextProps = {
        setShowToast: setShowToast,
        showToast: showToast
    }

    return <ToastContext.Provider value={ctxClients}>
        {children}
    </ToastContext.Provider>
}

export default ToastContextProvider