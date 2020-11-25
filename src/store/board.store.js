import { boardService } from '../services/board.service.js';

export default {
    strict: true,
    state: {
        boards: [],
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
            state.boards = boards;
        },
        addCard(state, { card, groupId }) {
            const group = state.boards[0].groups.find(group => groupId === group.id);
            group.cards.push(card);
        //add util.make id
        },
        updateCard(state, { card, groupId }) {
            const group = state.boards[0].groups.find(group => groupId === group.id);
            const idx = group.cards.findIndex(currCard => currCard.id === card.id);
            group.cards.splice(idx, 1, card);
        }

        // updateBoardWithList(state, { board }) {

        // },
    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query();
            commit({ type: 'setBoards', boards });
            commit({ type: 'setIsLoading', isLoading: false });
        },
        async saveBoard({ state }) {
            boardService.save(state.boards[0]);
        },
        async saveCard({ dispatch, commit }, { card, groupId }) {
            const type = (card.id) ? 'updateCard' : 'addCard';
            commit({ type, card, groupId });
            //ask asaf if it can save before updating card
            dispatch({ type: 'saveBoard' });
        }
        // async addList({commit}, {listName, boardId}) {
        //     var emptyList = await boardService.getEmptyList(listName);
        //     var currBoard = state.getBoardById(boardId);
        //     currBoard.groups.push(emptyList);

        //     const updatedBoard = await boardService.update(currBoard)

        //     commit({ type: 'updateBoardWithList', updatedBoard});
        // }
    }

};