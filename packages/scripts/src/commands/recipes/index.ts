/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as log from '@essex/tasklogger'
import { Command } from 'commander'
import { recipes } from './recipes'
export default function commitMsg(program: Command): void {
	program
		.command('recipes')
		.description('view common usage patterns for @essex/scripts')
		.action(async () => {
			log.info(recipes)
			process.exit(0)
		})
}
