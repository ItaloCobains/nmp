import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'init',
  alias: ['i'],
  run: async (toolbox) => {
    const { print, filesystem } = toolbox
    const home = process.env['HOME'] + '/.nmp'
    if (filesystem.exists(home)) {
      print.warning('Already initialized!')
      return
    } else {
      filesystem.dir(home)
      filesystem.write(`${home}/config.json`, {})
      print.success('Initialized!')
    }
  },
}

module.exports = command
