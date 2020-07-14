/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as webpack from 'webpack'
import { getCompiler } from './getCompiler'
import { WebpackCompilerOptions } from './types'

export function webpackWatch(config: WebpackCompilerOptions): Promise<number> {
	return new Promise((resolve, reject) => {
		const compiler = getCompiler(config)
		const watcher = compiler.watch(
			{
				aggregateTimeout: 500,
				ignored: /node_modules/,
			},
			(err: Error, stats: webpack.Stats) => {
				if (err) {
					reject(err)
				}
				console.log(stats.toString({ colors: true }))
			},
		)
	})
}
