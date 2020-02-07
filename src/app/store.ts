import { ITodo } from './todo.model';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS } from './actions';

export interface IAppState {
    todos: ITodo[];
    lastUpdate: Date;
}

export const INTIAL_STATE: IAppState = {
    todos: [],
    lastUpdate: null
};

export function rootReducer(state: IAppState, action) {
    switch (action.type) {
        case ADD_TODO:
            action.todo.id = state.todos.length + 1;
            /**
             * Since state cannot be modified directly,
             * so we are creating a copy of that.
             */
            const newState: IAppState = {
                todos: state.todos.concat(Object.assign({}, action.todo)),
                lastUpdate: new Date()
            };
            return Object.assign({}, state, newState);
        case TOGGLE_TODO:
            // find the item whose status is changed to completed
            // const todoIndex = state.todos.findIndex((item) => item.id === action.todo.id);
            // const localState = Object.assign({}, state, {lastUpdate: new Date()});
            // localState.todos[todoIndex].isCompleted = !localState.todos[todoIndex].isCompleted;
            // return localState;
            return Object.assign({}, state, {
                todos: state.todos.map((item) => {
                    if (item.id === action.id) {
                        item.isCompleted = !item.isCompleted;
                    }
                    return item;
                }),
                lastUpdate: new Date()
            });
        case REMOVE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.filter((item) => item.id !== action.id),
                lastUpdate: new Date()
            });
        case REMOVE_ALL_TODOS:
            return Object.assign({}, state, {
                todos: [],
                lastUpdate: new Date()
            });
    }
    return state;
}
