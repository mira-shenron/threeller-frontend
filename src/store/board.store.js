import { boardService } from '../services/board.service.js';


export default {
    strict: true,
    state: {
        boards: [],
        currBoard: null
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        currBoard(state) {
            console.log(state);
            return state.currBoard;
        },
        getLists(state) {
            return state.currBoard.groups;
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setCurrBoard(state, { boardId }) {
            state.currBoard = state.boards.find(board => board._id === boardId);
        },
        saveBoard(state, { board }) {
            state.currBoard = board;
        }
    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query();
            commit({ type: 'setBoards', boards });
            commit({ type: 'setIsLoading', isLoading: false });
        },
        async saveBoard({ commit }, { board }) {
            commit({ type: 'saveBoard', board });
            boardService.save(board);
        },
    }

};