import { useState } from 'react'
import Login from './paginas/Login/Login'
import Cadastro from './paginas/Cadastro/Cadastro'

function App() {
  const [telaAtual, setTelaAtual] = useState('login')

  if (telaAtual === 'cadastro') {
    return <Cadastro aoVoltar={() => setTelaAtual('login')} />
  }

  return <Login aoIrParaCadastro={() => setTelaAtual('cadastro')} />
}

export default App