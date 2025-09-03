"use client";

import { toast } from "sonner";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNetworkState } from "react-use";

interface NetworkContextType {
	online: boolean;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
	const { online } = useNetworkState();
	const [prevOnline, setPrevOnline] = useState(online);

	useEffect(() => {
		if (!online && prevOnline) {
			toast.error(
				"You are not connected to the network. Please check your connection."
			);
		} else if (online && !prevOnline) {
			toast.success("You are now connected to the network.");
		}
		setPrevOnline(online);
	}, [online, prevOnline]);

	return (
		<NetworkContext.Provider value={{ online: online ?? false }}>
			{children}
		</NetworkContext.Provider>
	);
}

export function useNetwork() {
	const context = useContext(NetworkContext);
	if (context === undefined) {
		throw new Error("useNetwork must be used within a NetworkProvider");
	}
	return context;
}
