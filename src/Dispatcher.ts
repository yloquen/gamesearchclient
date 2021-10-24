export class Listener
{

    public eventType:string;
    public func:Function;
    public scope:any;
    public once:boolean;
    public dispatcher:Dispatcher;
    public permanent:boolean;

    constructor(eventType:string, func:Function, scope:any, once:boolean, dispatcher:Dispatcher, permanent:boolean)
    {
        this.eventType = eventType;
        this.func = func;
        this.scope = scope;
        this.once = once;
        this.dispatcher = dispatcher;
        this.permanent = permanent;
    }

}

export default class Dispatcher
{

    private readonly listeners:Record<string, Listener[]>;


    constructor()
    {
        this.listeners = {};
    }


    emit(eventType:string, ...params:any)
    {
        const listenersToRemove = [];
        const listenersForEvent:Listener[] = this.listeners[eventType];

        if (listenersForEvent)
        {
            const numListeners = listenersForEvent.length;
            for (let listenerIdx = 0; listenerIdx < numListeners; listenerIdx++)
            {
                const listener = listenersForEvent[listenerIdx];

                if (listener)
                {
                    if (listener.scope)
                    {
                        listener.func.bind(listener.scope)(...params);
                    }
                    else
                    {
                        listener.func(...params);
                    }

                    if (listener.once)
                    {
                        listenersToRemove.push(listener);
                    }
                }

            }

            this.removeListeners(listenersForEvent, listenersToRemove);
        }
    }


    removeListeners(listenersForEvent:Listener[], listenersToRemove:Listener[])
    {
        listenersToRemove.forEach( listener =>
        {
            const index = listenersForEvent.indexOf(listener);
            listenersForEvent.splice(index, 1);

            if (this.listeners[listener.eventType]?.length === 0)
            {
                delete this.listeners[listener.eventType];
            }
        })
    }


    on(eventType:string, func:Function, scope:any = undefined, once:boolean = false, permanent:boolean = false):Listener
    {
        let listeners = this.listeners[eventType];
        if (!listeners)
        {
            listeners = [];
            this.listeners[eventType] = listeners;
        }

        let newListener = new Listener(eventType, func, scope, once, this, permanent);
        listeners.push(newListener);

        return newListener;
    }


    once(eventType:string, func:Function, scope:any = undefined):Listener|undefined
    {
        return this.on(eventType, func, scope, true);
    }


    removeListener(eventType:string, func:Function)
    {
        const listenersToRemove:Listener[] = [];
        const listenersForEvent = this.listeners[eventType];

        if (listenersForEvent)
        {
            listenersForEvent.forEach( listener =>
            {
                if (listener.func === func)
                {
                    listenersToRemove.push(listener)
                }
            });
        }

        this.removeListeners(listenersForEvent, listenersToRemove);
    }


    removeAllListenersOf(scope:any)
    {
        for (const eventType in this.listeners)
        {
            const listenersToRemove = [];
            const listenersForEvent = this.listeners[eventType];
            for (let listenerIdx = 0; listenerIdx < listenersForEvent.length; listenerIdx++)
            {
                const listener = listenersForEvent[listenerIdx];
                if (listener.scope === scope)
                {
                    listenersToRemove.push(listener);
                }
            }
            this.removeListeners(listenersForEvent, listenersToRemove);
        }
    }


    getNumListeners()
    {
        let num = 0;
        for (let eventType in this.listeners)
        {
            const listeners = this.listeners[eventType];
            num += listeners.length;
        }
        return num;
    }


    removeAll()
    {
        for (let eventType in this.listeners)
        {
            const listenersToRemove:Listener[] = [];
            const listenersForEvent = this.listeners[eventType];
            listenersForEvent.forEach(listener =>
            {
                if (!listener.permanent)
                {
                    listenersToRemove.push(listener);
                }
            });
            this.removeListeners(listenersForEvent, listenersToRemove);
        }

    }


}