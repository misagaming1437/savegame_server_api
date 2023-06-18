import { Service } from 'node-windows';
import appRootPath from 'app-root-path';
// Create a new service object
const execulabe = appRootPath + '\\savegame_api.exe'
var svc = new Service({
  name:'SaveGame API',
  description: 'SaveGame API',
  script: execulabe,
  execPath: execulabe,
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();