import httpService from './http.service'

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard
}

function query() {
    return httpService.get('boards')
}

function getById(id) {
    return httpService.get(`boards/${id}`)
}

function remove(id) {
    return httpService.delete(`boards/${id}`)
}

function save(board) {
    const savedBoard = (board._id) ?  update(board) : add(board);
    return savedBoard;
}

function update(board) {
    return httpService.put(`boards/${board._id}`, board)
}

function add(board) {
    return httpService.post(`boards`, board)
}

function getEmptyBoard() {
    return {
        //TODO
    }
}



