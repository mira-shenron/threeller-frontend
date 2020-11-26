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
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setCurrBoard(state, { boardId }) {
            state.currBoard = state.boards.find(board => board._id === boardId);
        },
        // updateCurrBoardWithList(state, { list }) {
        //     state.currBoard.groups.push(list);
        // },
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
        // async addList({ state, commit }, { listName }) {
        //     var list = await boardService.getEmptyList(listName);
        //     //on purpose this name, different types of  updates will come later
        //     commit({ type: 'updateCurrBoardWithList', list });

        //     const updatedBoard = await boardService.save(state.currBoard);
        //     console.log(updatedBoard);

        //     //if he didn`t succeed to save?? rollback??
        // }
    }

};