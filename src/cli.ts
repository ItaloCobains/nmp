import { build } from 'gluegun'

async function run(argv) {
  const cli = build()
    .brand('nmp')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'nmp-*', hidden: true })
    .help()
    .version()
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
