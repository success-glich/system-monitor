#!/usr/bin/env node

import os from 'node:os';
import SystemMonitor from "./index.js";
import internal from 'node:stream';

const args = process.argv.slice(2);

const options = {
    interval:1000,
    clearConsole:true,
    memoryUnit: 'GB',
}

//* Parse CLI argument

args.forEach(arg=>{
    const [key,value] = arg.split('=');
    switch(key){
        case '--interval':
            options.interval = parseInt(value);
            break;
        case '--no-clear':
            options.clearConsole = false;
            break;
        case '--memory-unit':
            options.memoryUnit = value ==='MB' ?'MB':'GB';
            break;
    }
})

console.log(`System Monitor - ${os.platform()} ${os.arch()}`);
console.log(`Press CTRL+C to exit`);

const monitor = new SystemMonitor(options);
const stop = monitor.start();

process.on("SIGINT",()=>{
    stop();
    console.log('Exiting...');
    process.exit();
})

