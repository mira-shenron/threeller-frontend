import { boardService } from '../services/board.service.js';


export default {
    strict: true,
    state: {
        boards: [],
        currBoard: null,
        defultColorsLabels:[],
        currActivityTxt:null
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
        getCurrActivityText(state){
            console.log('store getCurrActivityText', state.currActivityTxt);
            return JSON.parse(JSON.stringify(state.currActivityTxt));
        }
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
            const idx = state.boards.findIndex(currBoard => currBoard._id === board._id);
            state.boards.splice(idx,1,board);
        },
        addBoard(state, { savedBoard }) {
            console.log('mutation', savedBoard)
            state.boards.push(savedBoard);
            state.currBoard = savedBoard;
        },
        setCurrActivityText(state, {activityTxt}) {
            console.log('curr activity text', activityTxt);
            state.currActivityTxt = activityTxt;
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
        async updateBoard({ commit }, { board }) {
            // boardService.save(board);
            commit({ type: 'saveBoard', board });
        },
        async addBoard({ commit }, { board }) {
            const savedBoard = await boardService.save(board);
            console.log('saved board',savedBoard)
            commit({ type: 'addBoard', savedBoard });
        },
    }

};