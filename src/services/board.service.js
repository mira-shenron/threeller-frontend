import httpService from './http.service';
import utilService from './util.service';

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyList,
    getEmptyColorLabel,
    getEmptyChecklist,
    getEmptyTodo
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
    const savedBoard = (board._id) ? update(board) : add(board);
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

function getEmptyList(listName) {
    return {
        'id': utilService.makeId(),
        'title': listName,
        'cards': [],
        'style': {}
    }
}

function getEmptyChecklist(checklistName) {
    return {
        id: utilService.makeId(),
        title: checklistName,
        todos: []
    }
}

function getEmptyTodo(todoName){
    return {
        id: utilService.makeId(),
        title: todoName
    }
}


function getEmptyColorLabel(color = '') {
    return {
        id: utilService.makeId(),
        color: color,
        blindMode: '',
        txt: '',
        isPicked:false

    }

}



