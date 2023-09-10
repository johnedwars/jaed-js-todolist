import './style.css'
import { app } from './src/todos/app'
import todoStore from './src/store/todoStore';

todoStore.initStore();
app('#app');