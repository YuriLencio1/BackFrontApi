import { useEffect, useState, useRef  } from "react";
import "./App.css";
import Lixeira from "../../assets/lixeira.png";
import api from "../../servers/api";

function App() {
const [users, setUsers] = useState([])

const inputName= useRef()
const inputAge = useRef()
const inputEmail=useRef()

async function getUsers(params) {
  const usersFromApi = await api.get('/usuarios')  

  setUsers(usersFromApi.data)
}
  async function createUsers() {

    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value

      
    })
    getUsers();
  }


    async function deleteUsers(id) {

    await api.delete(`/usuarios/${id}`)
    
    getUsers();
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de usuario</h1>
          <input name="nome" type="text" placeholder="Nome" ref={inputName} />
          <input name="email" type="text" placeholder="Email" ref={inputEmail}/>
          <input name="idade" type="number" placeholder="Idade" ref={inputAge} />
          <button type="button" onClick={createUsers}>cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Idade: {user.age}</p>
            </div>

            <button type="button" onClick={() => deleteUsers(user.id)}>
              <img className="icone-lixeira" src={Lixeira} alt="Excluir" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default App;