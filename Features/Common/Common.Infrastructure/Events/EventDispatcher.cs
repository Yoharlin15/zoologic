using System.Collections.Concurrent;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

internal class EventDispatcher : IEventDispatcher
    {
        private static readonly ConcurrentDictionary<Type, Type> HandlerTypesCache = new();

        private static readonly ConcurrentDictionary<Type, Func<object, object, System.Threading.Tasks.Task>> HandlersCache = new();

        private static readonly Type HandlerType = typeof(IEventHandler<>);

        private static readonly MethodInfo MakeDelegateMethod = typeof(EventDispatcher)
            .GetMethod(nameof(MakeDelegate), BindingFlags.Static | BindingFlags.NonPublic)!;

        private static readonly Type EventHandlerFuncType = typeof(Func<Func<object, object, System.Threading.Tasks.Task>>);

        private readonly IServiceProvider serviceProvider;

        public EventDispatcher(IServiceProvider serviceProvider)
            => this.serviceProvider = serviceProvider;

        public async System.Threading.Tasks.Task Dispatch(IDomainEvent domainEvent)
        {
            var eventType = domainEvent.GetType();

            var handlerTypes = HandlerTypesCache.GetOrAdd(
                eventType,
                type => HandlerType.MakeGenericType(type));

            var eventHandlers = serviceProvider.GetServices(handlerTypes);

            foreach (var eventHandler in eventHandlers)
            {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var handlerServiceType = eventHandler.GetType();
#pragma warning restore CS8602 // Dereference of a possibly null reference.

                var eventHandlerDelegate = HandlersCache.GetOrAdd(handlerServiceType, type =>
                {
                    var makeDelegate = MakeDelegateMethod
                        .MakeGenericMethod(eventType, type);

                    return ((Func<Func<object, object, System.Threading.Tasks.Task>>)makeDelegate
                        .CreateDelegate(EventHandlerFuncType))
                        .Invoke();
                });

                await eventHandlerDelegate(domainEvent, eventHandler);
            }
        }

        private static Func<object, object, System.Threading.Tasks.Task> MakeDelegate<TEvent, TEventHandler>()
            where TEvent : IDomainEvent
            where TEventHandler : IEventHandler<TEvent>
            => (domainEvent, eventHandler) => 
                ((TEventHandler)eventHandler).Handle((TEvent)domainEvent);
    }