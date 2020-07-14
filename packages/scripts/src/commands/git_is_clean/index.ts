/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { run, Job } from '@essex/shellrunner'
import { Command } from 'commander'

export default function start(program: Command): void {
	program
		.command('git-is-clean')
		.description('verifies that there are no active git changes')
		.action(() => {
			Promise.resolve()
				.then(() => run(job))
				.then(({ code }) => process.exit(code))
		})
}

const job: Job = {
	exec: 'git',
	args: ['diff-index', '--quiet', 'HEAD'],
}
