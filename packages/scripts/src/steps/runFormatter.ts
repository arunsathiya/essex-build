/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Formatter } from '../types.mjs'
import { prettyQuick } from './pretty-quick/index.mjs'

export function runFormatter({
	formatter = Formatter.Prettier,
	fix,
	verbose,
}: {
	formatter?: Formatter | undefined
	fix?: boolean | undefined
	verbose?: boolean | undefined
}): Promise<void> {
	if (formatter === Formatter.None) {
		return Promise.resolve()
	}
	const args = fix ? { verbose } : { check: true, verbose }
	return prettyQuick(args)
}
