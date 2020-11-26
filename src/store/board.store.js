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
        currBoard(state){
            console.log(state)
            return state.currBoard;
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setCurrBoard(state, {boardId}){
            state.currBoard = state.boards.find(board => board._id === boardId);
        },
        updateCurrBoardWithList(state, {list}) {
           state.currBoard.groups.push(list);
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
        },

        async addList({state, commit}, {listName}) {
            var list = await boardService.getEmptyList(listName);
            //on purpose this name, different types of  updates will come later
            commit({ type: 'updateCurrBoardWithList', list});
            
            const updatedBoard = await boardService.save(state.currBoard);
            console.log(updatedBoard);

            //if he didn`t succeed to save?? rollback??
        }
    }

};