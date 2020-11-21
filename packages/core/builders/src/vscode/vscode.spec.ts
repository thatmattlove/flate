import test from 'ava'

import { VScodeBuilder } from './vscode.builder'

import themeBase from './mock/flate.json'

import { SETTINGS } from '../constants'
import { getMockPath } from '../utils'

const DEFAULT_PROPS = getMockPath('vscode')

test('Create many Variants', ({ is, deepEqual }) => {
  const build = new VScodeBuilder(DEFAULT_PROPS)

  build.theme.stage = themeBase

  is('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('Create variant', ({ is, deepEqual }) => {
  const build = new VScodeBuilder(DEFAULT_PROPS)

  build.theme.variants.push(themeBase)

  is('created', build.createVariants())
  deepEqual({ [SETTINGS.themeName]: themeBase }, build.theme.final)
})

test('Set Font Styles', ({ deepEqual }) => {
  const build = new VScodeBuilder(DEFAULT_PROPS)

  build.theme.stage = themeBase

  const expected: any[] = []

  themeBase.fontStyle.forEach(fontStyle => {
    expected.push({
      ...themeBase,
      tokenColors: [
        {
          name: '',
          scope: [],
          settings: {
            fontStyle: fontStyle === 'none' ? '' : fontStyle,
          },
        },
      ],
      fontStyle: fontStyle === 'none' ? '' : fontStyle,
    })
  })

  build.setFontStyles()

  deepEqual(expected, build.theme.variants)
})

test('Compilation', ({ is }) => {
  const expected = new VScodeBuilder(DEFAULT_PROPS).compile()
  is('done', expected)
})