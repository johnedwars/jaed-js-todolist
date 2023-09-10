import todoStore, { Filters } from '../store/todoStore';
import html from './app.html?raw'
import { renderPending, renderTodos } from './use-cases';


const ElementIDs = {
    ClearCompleted: '.clear-completed',
    Todolist: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}
export const app =  (elementId)  => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.Todolist, todos);
        updatePendingCount()
    
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel)
    }



    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.Todolist);
    const ClearCompletedbutton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    //Obtener
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode != 13) return;
        if (event.target.value.trim().length ===0) return;
        
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    //tachar completado
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    //tachar completados
    todoListUL.addEventListener('click', (event) => {
        const isDestoryElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestoryElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    ClearCompletedbutton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }

            displayTodos();

        });


    });

}