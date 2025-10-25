"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export function useDir() {
	const params = useParams();
	const [direction, setDirection] = useState("ltr");

	useEffect(() => {
		const dir = document.documentElement.dir || "ltr";
		setDirection(dir);
	}, [params.locale]);

	return direction;
}
