import React, { useState, useEffect } from 'react';
import Todo from "./components/todo";
import TodoForm from "./components/TodoForm"
import Search from "./components/Search"
import Filter from "./components/filter"
import "./App.css"

function App() {
  // Estado que armazena a lista de tarefas.
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  // Estado que armazena a string de busca para filtrar tarefas.
  const [search, setSearch] = useState("");

  // Estado que armazena a opção de filtro para mostrar tarefas completadas, não completadas ou todas.
  const [filter, setFilter] = useState("All");

  // Estado que armazena a opção de ordenação para ordenar tarefas em ordem ascendente ou descendente.
  const [sort, setSort] = useState("Asc");

  // Efeito colateral que salva a lista de tarefas no armazenamento local sempre que ela é modificada.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Função para adicionar uma nova tarefa à lista de tarefas.
  const addTodo = (text, category, date) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 1000),
      text, 
      category,
      date,
      isCompleted: false,
    }];
    setTodos(newTodos);
  };

  // Função para remover uma tarefa da lista de tarefas com base no seu ID.
  const removeTodo = (id) => {
    const newTodos = [...todos]
    const filterTodos = newTodos.filter((todo => todo.id !== id ? todo : null));
    setTodos(filterTodos);
  };

  // Função para marcar ou desmarcar uma tarefa como completada com base no seu ID.
  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos);
  }

  // Renderiza o componente App.
  return (
    <div className='app'>
      <h1>Lista de tarefas</h1>
      {/* Componente de busca */}
      <Search search={search} setSearch={setSearch}/>
      {/* Componente de filtro */}
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <div className='todo-list'>
        {/* Filtra, ordena e mapeia as tarefas para o componente Todo */}
        {todos
          .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
          .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => sort === "Asc" ? 
            a.text.localeCompare(b.text)
            : b.text.localeCompare(a.text) )
          .map((todo) => (
           <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}/>
          ))}
      </div>
      {/* Componente de formulário para adicionar tarefas */}
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

// Exporta o componente App.
export default App;