const EventEmitter= require('events');


class Server extends EventEmitter{
    constructor(client){
        super();
        this.tasks= {};
        this.taskid= 1;


process.nextTick(()=>{
    this.emit('response','Type a  command(help to list command)')
}

);

    client.on('command',(command , args)=>{
        // console.log('Command:'+command)
        switch (command){
            case 'help':
            case 'ls':
            case 'delete':
            case 'add':
            this[command](args);
            break;
            default:
            this.emit('response','Unknown command...')
        }
    })
    }
tasksString(){
    return Object.keys(this.tasks).map(key =>{
return `${key}: ${this.tasks[key]}`;

    }).join('\n');
}
help(){
    this.emit('response',`Available Commands:
    add task
    ls
    delete id
    `)
}
ls(){
    this.emit('response',`Tasks:\n${this.tasksString()}`);
}
delete(args){
    delete(this.tasks[args[0]]);
    this.emit('response',`Deleted task ${args[0]}`)
    // this.emit('response','delete .....')
}
add( args){
    this.tasks[this.taskid]= args.join(' ');
    this.emit('response', `Added Task ${this.taskid}`);
    this.taskid++;
    // this.emit('response',args.join( ' '))
}

}

module.exports = (client) => new Server(client);