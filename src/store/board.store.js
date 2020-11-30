import { boardService } from '../services/board.service.js';


export default {
    strict: true,
    state: {
        boards: [],
        currBoard: null,
        defultColorsLabels:[]
    },
    getters: {
        boards(state) {
            return JSON.parse(JSON.stringify(state.boards));
        },
        currBoard(state) {
            return JSON.parse(JSON.stringify(state.currBoard));
        },
        getLists(state) {
            return JSON.parse(JSON.stringify(state.currBoard.groups));
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setCurrBoard(state, { boardId }) {
            state.currBoard = state.boards.find(board => board._id === boardId);
        },
        setBoard(state, { board }) {
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
            commit({ type: 'setBoard', board });
            boardService.save(board);
        },
    }

};