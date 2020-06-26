/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Job, run } from '@essex/shellrunner'
import { getEslintJob } from './getEslintJob'

export interface LintCommandOptions {
	fix?: boolean
	staged?: boolean
	docs?: boolean
	strict?: boolean
	spellingIgnore?: string
}

const PRETTY_QUICK_JOB: Job = {
	exec: 'pretty-quick',
	args: ['--check'],
}

const TONAL_LINTING_JOB: Job = {
	exec: 'alex',
	args: ['.'],
}

const SPELL_CHECK_JOB = (spellingIgnore: string | undefined): Job => {
	const args = [
		'--report',
		'--en-us',
		'--no-suggestions',
		'--ignore-acronyms',
		'--ignore-numbers',
		'**/*.md',
		'!**/node_modules/**/*.md',
		'!CHANGELOG.md',
	]
	if (spellingIgnore != null) {
		args.push(`!${spellingIgnore}`)
	}
	return {
		exec: 'mdspell',
		args,
	}
}

export async function execute({
	fix = false,
	staged = false,
	docs = false,
	strict = false,
	spellingIgnore,
}: LintCommandOptions): Promise<number> {
	const eslint = await getEslintJob(fix, strict)

	const toRun: Job[] = [eslint]
	if (!staged) {
		toRun.push(PRETTY_QUICK_JOB)
		if (docs) {
			toRun.push(TONAL_LINTING_JOB, SPELL_CHECK_JOB(spellingIgnore))
		}
	}
	const { code } = await run(...toRun)
	return code
}
