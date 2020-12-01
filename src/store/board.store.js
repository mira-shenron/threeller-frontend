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
        saveBoard(state, { board }) {
            console.log('curr board', board)
            state.currBoard = board;
        },
        addBoard(state, { savedBoard }) {
            console.log('mutation', savedBoard)
            state.boards.push(savedBoard);
            state.currBoard = savedBoard;
        }
    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query();
            commit({ type: 'setBoards', boards });
            commit({ type: 'setIsLoading', isLoading: false });
        },
        async saveBoard({ commit }, { board }) {
            // commit({ type: 'saveBoard', board });
            boardService.save(board);
            commit({ type: 'saveBoard', board });
        },
        async addBoard({ commit }, { board }) {
            const savedBoard = await boardService.save(board);
            console.log('saved board',savedBoard)
            commit({ type: 'addBoard', savedBoard });
        },
    }

};