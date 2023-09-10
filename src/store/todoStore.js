import { Todo } from "../todos/models/todoModels";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

let state = {
    todos: [
        new Todo('Ejemplo: Ir al supermercado'),


    ],
    filter:  Filters.All,
}

const initStore = () => {
    console.log('Inicializando...');
}



const loadStore = () => {
    if( !localStorage.getItem('state') ) return;


    console.log(JSON.parse( localStorage.getItem('state') ))

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
    console.log('EJECUTANDO 222');
    saveStateTodoStorage();
}

const saveStateTodoStorage  = () => {
    localStorage.setItem('state', JSON.stringify(state));
    console.log('EJECUTANDO');
}

const getTodos  = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(Todo => Todo.done);
        case Filters.Pending:
            return state.todos.filter(Todo => !Todo.done);
        default:
            throw new Error('Option is not valid');
    }
}

const addTodo  = (description) => {
    if (!description) throw new Error('Descripcion is required');
    state.todos.push(new Todo(description));
    saveStateTodoStorage();
}

const toggleTodo  = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    
}

const deleteTodo  = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId  );
    saveStateTodoStorage();
    loadStore();
}
const deleteCompleted  = () => {
    state.todos = state.todos.filter(todo => !todo.done)};
    saveStateTodoStorage();

const setFilter = ( newFilter = Filters.All ) => {
        state.filter = newFilter;
        saveStateTodoStorage();
}
    

const getCurrentFilter  = ( ) => {
    return state.filter;
}
export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteCompleted,
    getCurrentFilter,
    getTodos,
    setFilter,
    deleteTodo
}