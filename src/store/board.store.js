import { boardService } from '../services/board.service.js'

export default {
    strict: true,
    state: {
        boards: []
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        getBoardById(boardId) {
            return this.boards.filter(board => board._id === boardId);
        }

    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        // updateBoardWithList(state, { board }) {
           
        // },
    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query();
            commit({ type: 'setBoards', boards })
            commit({ type: 'setIsLoading', isLoading: false })
        },
        // async addList({commit}, {listName, boardId}) {
        //     var emptyList = await boardService.getEmptyList(listName);
        //     var currBoard = state.getBoardById(boardId);
        //     currBoard.groups.push(emptyList);

        //     const updatedBoard = await boardService.update(currBoard)

        //     commit({ type: 'updateBoardWithList', updatedBoard});
        // }
    }

}