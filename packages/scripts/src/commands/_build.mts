/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { existsSync } from 'fs'
import path from 'path'
import type { Command } from 'commander'

import { generateApiExtractorReport } from '../steps/api-extractor/index.mjs'
import { esmify as processEsm } from '../steps/esmify/index.mjs'
import { compile as compileTypescript } from '../steps/typescript/index.mjs'
import { verifyExports } from '../steps/verifyExports/index.mjs'
import { verifyPackage } from '../steps/verifyPackage/index.mjs'
import { BuildMode } from '../types.mjs'
import { noop } from '../util/noop.mjs'

export interface BuildCommandOptions {
	/**
	 * Emits TypeDoc documentation generation
	 */
	docs?: boolean

	/**
	 * Strips internal types from typings output
	 */
	stripInternalTypes?: boolean

	/**
	 * Opt-out of ESM processing and verification
	 */
	skipPackageCheck?: boolean
	skipExportCheck?: boolean

	/**
	 * Builds UI component stories
	 */
	stories?: boolean

	mode?: BuildMode
}

export default function build(program: Command): void {
	program
		.command('build')
		.description('builds a library package')
		.option('-d, --docs', 'generates api-extractor documentation')
		.option(
			'--stripInternalTypes',
			'strip out internal types from typings declarations',
		)
		.option('--skipPackageCheck', 'skips package.json verification check')
		.option('--skipExportCheck', 'skips esm/cjs export check')
		.option('--mode [mode]', 'options are "dual" and "esm"')
		.action(async (options: BuildCommandOptions): Promise<void> => {
			await executeBuild(options)
		})
}

export async function executeBuild({
	docs = false,
	stripInternalTypes = false,
	skipExportCheck = false,
	skipPackageCheck = false,
	mode = BuildMode.esm,
}: BuildCommandOptions): Promise<void> {
	const checkPackage = !skipPackageCheck
	const checkExports = !skipExportCheck
	const rewriteEsmToMjs = mode === BuildMode.dual
	const esmOnly = mode === BuildMode.esm
	const cwd = process.cwd()
	const tsConfigPath = path.join(cwd, 'tsconfig.json')

	if (!existsSync(tsConfigPath)) {
		throw new Error('tsconfig.json must exist')
	}

	await compileTypescript(stripInternalTypes, esmOnly)
	const generateDocs = docs ? generateApiExtractorReport() : noop()

	await processEsm(rewriteEsmToMjs, esmOnly ? 'dist/' : 'dist/esm')

	if (checkPackage) await verifyPackage(mode)
	if (checkExports) await verifyExports(esmOnly)

	// wrap up long-running tasks
	await generateDocs
}
