import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "fs";
import { join } from "path";

// Custom error class for handling script errors
class ScriptError extends Error {
	constructor(message: unknown) {
		super(`\x1b[31m❌ [Error Processing i18n]: ${message}\x1b[0m`);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

// Start a timer for measuring script execution time
console.time("\x1b[32m[i18n Processing]:\x1b[0m Finished processing i18n in");

// Define the locales to be processed
const locales = ["en", "fr"] as const;

// Initialize an object to store messages for each locale
const messages: Record<string, Record<string, unknown>> = locales.reduce(
	(acc: Record<string, Record<string, unknown>>, locale: string) => {
		acc[locale] = {};
		return acc;
	},
	{}
);

// Ensure each locale has a corresponding JSON file in the messages directory
locales.forEach((locale: string) => {
	const dirPath = `./src/messages`; // Directory path for messages
	const filePath = join(dirPath, `${locale}.json`); // File path for each locale

	// Create the directory if it doesn't exist
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath, { recursive: true });
	}

	// Create an empty JSON file for the locale if it doesn't exist
	if (!existsSync(filePath)) {
		writeFileSync(filePath, JSON.stringify(messages[locale] ?? {}), {
			flag: "wx",
		});
	}
});

// Recursive function to process directories and merge i18n files
const processDirectory = (directory: string): void => {
	readdirSync(directory).forEach((file: string) => {
		const absolute = join(directory, file); // Absolute path of the file/directory
		if (statSync(absolute).isDirectory()) {
			// If the directory is named "i18n", process the JSON files within it
			if (file === "i18n") {
				locales.forEach((locale: string) => {
					const filePath = join(absolute, `${locale}.json`); // Path to locale JSON file
					if (existsSync(filePath)) {
						// Read and parse the JSON file
						const content = JSON.parse(
							readFileSync(filePath, "utf8")
						) as Record<string, unknown>;
						const keys = Object.keys(content); // Get top-level keys

						// Ensure there's only one top-level key
						if (keys.length !== 1) {
							throw new ScriptError(
								`Expected one top-level key in ${filePath}, but found ${keys.length}`
							);
						}

						const key = keys[0];
						if (key === undefined) {
							throw new ScriptError(
								`No key found in ${filePath}`
							);
						}

						const value = content[key];
						if (value === undefined) {
							throw new ScriptError(
								`No value found for key ${key} in ${filePath}`
							);
						}

						const messagesAtLocale = messages[locale];
						if (messagesAtLocale === undefined) {
							throw new ScriptError(
								`No messages found for locale ${locale}`
							);
						}

						// Check for duplicate keys
						if (messagesAtLocale[key] !== undefined) {
							throw new ScriptError(
								`Duplicate key ${key} found in ${filePath}`
							);
						}

						// Add the key-value pair to the messages object
						messagesAtLocale[key] = value;
					}
				});
			} else {
				// If not an "i18n" directory, recurse into the subdirectory
				processDirectory(absolute);
			}
		}
	});
};

// Start processing the directories from the root
processDirectory(".");

// Write the merged messages back to the main JSON files for each locale
locales.forEach((locale: string) => {
	if (messages[locale] !== undefined) {
		writeFileSync(
			`./src/messages/${locale}.json`,
			JSON.stringify(messages[locale])
		);
		console.log(
			`\x1b[32m[i18n Processing]:\x1b[0m Successfully processed locale - ${locale}`
		);
	}
});

// End the timer and log the script execution time
console.timeEnd(
	"\x1b[32m[i18n Processing]:\x1b[0m Finished processing i18n in"
);
