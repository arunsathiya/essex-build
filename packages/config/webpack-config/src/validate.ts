/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { pkgJson } from './configValues'

/**
 * Validates the webpack configuration
 */
export function validateConfiguration() {
	if (pkgJson.homepage && !pkgJson.homepage.endsWith('/')) {
		throw new Error(
			"package.json homepage setting should end with a '/' character for the base tag to function properly",
		)
	}
	// perform any additional validation here
}