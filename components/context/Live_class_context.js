import React, { useContext } from 'react'

const Live_class = React.createContext()

export function useLiveclass(){
    return useContext(Live_class)
}

export function Live_class_provider({children}){

    async function set_peer_Connection(){
        console.log("Live CLass context is working")
    }
    const value = {
        set_peer_Connection,
    }
    return (
        <Live_class.Provider value={value}>
            {children}
        </Live_class.Provider>
    )
}