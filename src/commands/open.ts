import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'open',
  alias: ['o'],
  run: async function (toolbox) {
    const { print, filesystem, system } = toolbox

    const path = process.env['HOME'] + '/.nmp'

    const folders = filesystem.subdirectories(path)
    print.success('Opening projects...')
    for (const folder of folders) {
      system.run(`code ${folder}`)
    }
  },
}

module.exports = command
