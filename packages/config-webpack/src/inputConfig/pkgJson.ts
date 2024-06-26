/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { join } from 'path'

export const pkgJson = require(join(process.cwd(), 'package.json')) as {
	homepage?: string
	title?: string
	name?: string
}
