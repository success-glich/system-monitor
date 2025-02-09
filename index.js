import os from 'node:os'

class SystemMonitor{
    #intervalId = null;
    #oldCpus = null;

    constructor(options = {}){
        this.options = {
            interval:1000,
            clearConsole:true,
            memoryUnit: 'GB',
            ...options            
        }
    }
    start(){
        this.#oldCpus = os.cpus();
        this.#intervalId = setInterval(()=>this.#monitor(),this.options.interval);
   
        return this.stop.bind(this);
    }

    stop(){

        clearInterval(this.#intervalId);
        this.#intervalId = null;
    }

    #monitor(){

        const newCpus = os.cpus();
    
        const cpuUsage = newCpus.map((cpu,index)=>({
            core:index,
            usage :this.#calculateCPUUsage(this.#oldCpus[index],cpu),
        }));

        
        this.#oldCpus = newCpus;
        const memoryUsage = this.#calculateMemoryUsage();

        if(this.options.clearConsole){
            console.clear();
        }

        console.table(cpuUsage);
        console.log(this.#formatMemoryOutput(memoryUsage));

    }

    #calculateCPUUsage(oldCpu,newCpu){

        const oldTotal= Object.values(oldCpu.times).reduce((acc,time)=>acc+time,0);
        const newTotal = Object.values(newCpu.times).reduce((acc,time)=>acc+time,0);
       
        const totalDiff = newTotal - oldTotal;
        const idleDiff = newCpu.times.idle - oldCpu.times.idle;
        const used = totalDiff - idleDiff;
        return `${((100*used) /totalDiff).toFixed(1)}%`
    }

    #calculateMemoryUsage(){
        const total = os.totalmem();
        const free = os.freemem();
        const used = total - free;
        const unit = this.options.memoryUnit==='GB' ?1024**3:1024**2;

        return {
            used:used / unit,
            total:total / unit,
            unit:this.options.memoryUnit
        }
    }

    #formatMemoryOutput(memory){
        return `Memory Usage: ${memory.used.toFixed(2)}${memory.unit} / ${memory.total.toFixed(2)}${memory.unit}`
    }
}

export default SystemMonitor;