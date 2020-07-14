/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { tsJob } from './tsJob'

/**
 * Compiles typescript from src/ to the lib/ folder
 * @param configFile The tsconfig.json path
 * @param verbose verbose mode
 */
export function compileTypescript(
	configFile: string,
	debug: boolean,
): () => NodeJS.ReadWriteStream {
	return tsJob({
		configFile,
		debug,
		dest: 'lib',
		title: 'tsc',
	})
}
