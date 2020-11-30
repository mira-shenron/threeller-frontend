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
    return httpService.get('board')
}

function getById(id) {
    return httpService.get(`board/${id}`)
}

function remove(id) {
    return httpService.delete(`board/${id}`)
}

function save(board) {
    const savedBoard = (board._id) ? update(board) : add(board);
    return savedBoard;
}

function update(board) {
    return httpService.put(`board/${board._id}`, board)
}

function add(board) {
    console.log('posting board')
    return httpService.post(`board`, board)
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

function getEmptyTodo(todoName) {
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
        txt: ' '

    }

}

function getEmptyBoard(boardName, currUser) {
    return {
        title: boardName,
        createdAt: Date.now(),
        createdBy: currUser,
        style: {},
        members: [],
        groups: [],
        activities: [],
        colorList: [
            {
                "id": "XEGHq",
                "color": "green",
                "blindMode": "",
                "txt": ""
            },
            {
                "id": "NEeA6",
                "color": "yellow",
                "blindMode": "",
                "txt": ""
            },
            {
                "id": "GoSzl",
                "color": "orange",
                "blindMode": "",
                "txt": ""
            },
            {
                "id": "ricgk",
                "color": "red",
                "blindMode": "",
                "txt": ""
            },
            {
                "id": "uZ1KX",
                "color": "purple",
                "blindMode": "",
                "txt": ""
            },
            {
                "id": "ki1py",
                "color": "blue",
                "blindMode": "",
                "txt": ""
            }
        ],
    }
}



