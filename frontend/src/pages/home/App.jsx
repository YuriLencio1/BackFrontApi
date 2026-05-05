import { use, useEffect } from "react";
import "./App.css";
import Lixeira from "../../assets/lixeira.png";
import api from "../../servers/api"

function App() {
  let users = [];

  async function getUsers(){
    users = await api.get('/')
  }

useEffect(()=>{
  getUsers()

})

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de usuario</h1>
          <input name="nome" type="text" placeholder="Nome" />
          <input name="email" type="text" placeholder="Email"/>
          <input name="idade" type="number" placeholder="Idade"/>
          <button type="button">cadastrar</button>
        </form>

             {users.map((user => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Idade: {user.age}</p>
          </div>
          <button>
            <img className="icone-lixeira" src={Lixeira} />
          </button>
        </div>
      )))}
      </div>


 
    </>
  );
}

export default App;
