import axios from 'axios';
import React, { useState } from 'react';
import Sugar from 'sugar';
import { handleError } from './HelperFunctions';
import Dropdown from './Dropdown.js';
import Tooltip from './Tooltip.js';
import { ReactComponent as PencilIcon } from '../assets/icons/pencil.svg';
import { ReactComponent as TrashIcon } from '../assets/icons/trash_can.svg';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';

export default function ToDoElement(props) {
  const [allTodos, setAllTodos] = useState([]);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [editedTodoInput, setEditedTodoInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { getAllTodos, token, el } = props;

  function deleteElement(id) {
    let options = {
      method: 'delete',
      url: `/todos/${id}`,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      data: {
        title: allTodos,
      },
    };

    axios(options)
      .then((res) => getAllTodos())
      .catch((err) => handleError(err, setErrorMsg));
  }

  function completeTodo(el) {
    let options = {
      method: 'put',
      url: `/todos/${el.id}`,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      data: {
        title: el.title,
        completed: el.completed ? false : true,
        importance: el.importance,
      },
    };

    axios(options)
      .then((res) => getAllTodos())
      .catch((err) => handleError(err, setErrorMsg));
  }

  function selectToEdit(el) {
    if (editedTodoId == el.id) {
      setEditedTodoId(null);
      setEditedTodoInput('');
    } else {
      setEditedTodoId(el.id);
      setEditedTodoInput(el.title);
    }
  }

  function editTodo(el, event) {
    event.preventDefault();

    let options = {
      method: 'put',
      url: `/todos/${el.id}`,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      data: {
        title: editedTodoInput,
        completed: el.completed,
        importance: el.importance,
      },
    };

    axios(options)
      .then((res) => {
        getAllTodos();
        setEditedTodoId(null);
        setEditedTodoInput('');
      })
      .catch((err) => handleError(err, setErrorMsg));
  }

  function updateImportance(el, number) {
    let options = {
      method: 'put',
      url: `/todos/${el.id}`,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      data: {
        title: el.title,
        completed: el.completed,
        importance: number,
      },
    };

    axios(options)
      .then((res) => getAllTodos())
      .catch((err) => handleError(err, setErrorMsg));
  }

  let sugarDate = Sugar.Date.create(el.created);
  let formattedDate = Sugar.Date.format(sugarDate, '{dd}/{MM}/{yyyy}');
  let formattedTime = Sugar.Date.format(sugarDate, '{HH}:{mm}:{ss}');

  return (
    <div className='todoWrapper'>
      <div className='checkboxTitleButtons'>
        <div className='todoElement' key={el.id}>
          <label className='checkboxContainer'>
            <input
              type='checkbox'
              checked={el.completed}
              onChange={() => completeTodo(el)}
            />
            <span class='checkmark'></span>
          </label>
          {editedTodoId != el.id ? (
            <div className='titleContainer'>
              <div className={el.completed ? 'completed' : 'todoElement'}>
                <p>{el.title}&nbsp;&nbsp;</p>
              </div>
            </div>
          ) : (
            <div className='titleContainer'>
              <div className='todoElement'>
                <form onSubmit={(event) => editTodo(el, event)}>
                  <input
                    type='text'
                    value={editedTodoInput}
                    className='editInput'
                    autoFocus
                    onChange={(event) => setEditedTodoInput(event.target.value)}
                  />
                </form>
              </div>
            </div>
          )}
        </div>
        <div className='buttonListRow'>
          {editedTodoId != el.id ? (
            <div className='buttonListElements'>
              <button
                className={el.completed ? 'buttonEditInactive' : 'buttonEdit'}
                onClick={() => selectToEdit(el)}
              >
                <PencilIcon className='icon' />
              </button>
            </div>
          ) : (
            <div className='buttonListElements'>
              <button
                className='buttonEdit'
                style={{
                  backgroundColor: 'rgb(114, 180, 140)',
                  border: 'none',
                  fill: 'white',
                }}
                onClick={() => selectToEdit(el)}
              >
                <PencilIcon className='icon' />
              </button>
            </div>
          )}
          <div className='buttonListElements'>
            <button
              className='buttonDelete'
              onClick={() => deleteElement(el.id)}
            >
              <TrashIcon className='icon' />
            </button>
          </div>
          <Tooltip date={formattedDate} time={formattedTime}>
            <div className='buttonListElements'>
              <button className='buttonCalendar'>
                <CalendarIcon className='icon' />
              </button>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className='dropdownWrapper'>
        <Dropdown
          value={el.importance}
          isCompleted={el.completed}
          onSelect={(num) => {
            updateImportance(el, num);
          }}
        />
      </div>
    </div>
  );
}
