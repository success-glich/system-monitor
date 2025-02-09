# System Monitor 

Real-time system monitoring tool for Node.js with CPU and memory tracking

## Installation

```bash
npm install -g system-monitor-pro
```

# Quick Start

1. <b>CLI Usage </b>
```bash
system-monitor [options]
```

Options:
   1. --interval=<ms>: Update interval in milliseconds (default: 1000)

   2. --no-clear: Disable console clearing between updates

   3. --unit=<UNIT>: Memory unit (GB/MB, default: GB)

Example Output
```bash
System Monitor - <arch>
┌─────────┬───────────────┐  
│ (index) │    Values     │  
├─────────┼───────────────┤  
│  core   │       0       │  
│  usage  │    '15.2%'    │  
└─────────┴───────────────┘  
Memory Usage: 3.45/8.00 GB  
```
2. Programmatic Usage
Integrate the monitor int your Node.js application:

```bash
import SystemMonitor from "system-monitor";

//* Create a monitor instance
const monitor = new SystemMonitor({
   interval:1500,
   clearConsole:true,
   memoryUnit:'MB'
})

//* Start monitoring
const stop = monitor.start();

//* Stop monitoring after 10 seconds
setTimeout(()=>{
   stop();
},10000)


