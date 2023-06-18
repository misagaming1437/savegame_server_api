import { Service } from 'node-windows';
import appRootPath from 'app-root-path';


// Create a new service object
const execulabe = appRootPath + '\\savegame_api.exe'

// ----------
const svc = new Service({
  name: 'SaveGame_API',
description: 'SaveGame_API',
script: execulabe,
scriptOptions: 'start',
execPath: execulabe,
nodeOptions: [
  '--harmony',
  '--max_old_space_size=4096'
]
});
// ---install service windows
export const installService=()=>{
  console.log('start install service')
  
svc.on('install',function(){
  svc.start();
});

svc.install();
}


//----------
// ----------  uninstall service
export const unInstallService=()=>{
 
  console.log('start uninstall service')
svc.on('uninstall',function(){
  svc.stop();
});
svc.uninstall();
setInterval(process.exit,1000)

}

export default {
  installService,
  unInstallService
}