import { GluegunCommand } from 'gluegun'
import { GluegunAskResponse } from 'gluegun/build/types/toolbox/prompt-types'

interface AddOptions {
  type: string
  name: string
  message: string
}

const command: GluegunCommand = {
  name: 'add',
  alias: ['a'],
  run: async (toolbox) => {
    const configPath = process.env['HOME'] + '/.nmp'
    const questions: AddOptions[] = [
      {
        message: 'Enter the URL of the github project you want to install',
        name: 'url',
        type: 'input',
      },
      {
        message: 'Enter with a command to install the project',
        name: 'command',
        type: 'input',
      },
      {
        message: 'Enter with a command to run the project',
        name: 'run',
        type: 'input',
      },
    ]
    const { print, prompt, strings, system, filesystem } = toolbox
    const result: GluegunAskResponse[] = []
    for (const question of questions) {
      result.push(await prompt.ask(question))
    }
    print.success(`Installing ${result[0].url}...`)

    strings.trim(
      await system.run(`cd ${configPath} && git clone ${result[0].url}`)
    )

    const projectName = result[0].url.split('/').pop()

    const data = await filesystem.readAsync(`${configPath}/config.json`)

    const config = JSON.parse(data)

    config[projectName] = {
      command: result[1].command,
      run: result[2].run,
    }

    await filesystem.writeAsync(`${configPath}/config.json`, config)

    print.success(`Installed ${result[0].url}!`)
  },
}

module.exports = command
