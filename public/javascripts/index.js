// 初始變數
const list = document.querySelector('#my-todo')
const addBtn = document.querySelector('#addBtn')
const input = document.querySelector('#newTodo')
const trash = document.querySelector('#trash')
const finish = document.querySelector('#finish')
const conList = document.querySelector('.container-list')
const conFinish = document.querySelector('.container-finish')
const conTrash = document.querySelector('.container-trash')


// 函式:list
function addItem(text) {
  const newItem = document.createElement('div')
  newItem.className = "listItem"
  newItem.innerHTML = `
    <label for="todo list-group-item" class="item col-8">
			<input class="form-check-input me-1" type="checkbox" value="">
			${text}
		</label>
		<i class="fas fa-minus-circle circle-delete"></i>
  `
  list.appendChild(newItem)
}

//監聽整個list有沒有被點擊
list.addEventListener('click', function (event) {
  const target = event.target
  moveToTrash(target)
  moveFinishTrash(target)
})

finish.addEventListener('click', function (event) {
  const target = event.target
  moveToTrash(target)
  moveFinishTrash(target)
})

trash.addEventListener('click', function (event) {
  const target = event.target
  moveOutTrash(target, list)
})

function moveToTrash(target) {
  const id = target.parentElement.parentElement.id
  const circle = target.classList.contains('circle-delete')

  if (circle && id === 'finish') {
    target.className = "fas fa-undo return"
    trash.prepend(target.parentElement)
  } else if (circle && id !== 'finish') {
    target.className = "fas fa-undo return"
    target.previousElementSibling.classList.toggle('checked')
    trash.prepend(target.parentElement)
  }


}

function moveFinishTrash(target) {
  //判別要移動到哪一個item
  if (target.tagName === 'INPUT' && target.classList.contains('finish-item') === false) {
    target.parentElement.classList.toggle('checked')
    finish.prepend(target.parentElement.parentElement)
    target.classList.add('finish-item')
  } else if (target.tagName === 'INPUT' && target.classList.contains('finish-item') === true) {
    target.parentElement.classList.toggle('checked')
    list.prepend(target.parentElement.parentElement)
    target.classList.remove('finish-item')
  }
}

function moveOutTrash(target, listItem) {
  //回到List清單

  if (target.classList.contains('return')) {
    const checkFinishItem = target.previousElementSibling.children[0].classList.contains('finish-item')
    if (checkFinishItem === false) {
      target.className = "fas fa-minus-circle circle-delete"
      target.previousElementSibling.classList.toggle('checked')
      list.prepend(target.parentElement)
    }
  } else if (target.tagName === 'INPUT' && target.classList.contains('finish-item') === true) {
    target.classList.remove('finish-item')
  }
}

function clean(target) {
  if (target.classList.contains('fa-trash-alt')) {
    const number = target.parentElement.nextElementSibling.children.length
    const beforeRemove = target.parentElement.nextElementSibling.children
    for (let i = 0; i < number; i++) {
      beforeRemove[0].remove()
    }
  }
}

conList.addEventListener('click', function (event) {
  const target = event.target
  clean(target)
})

conFinish.addEventListener('click', function (event) {
  const target = event.target
  clean(target)
})

conTrash.addEventListener('click', function (event) {
  const target = event.target
  clean(target)
})