import React, {useState} from 'react';
import styled from 'styled-components';

import forca0 from './assets/forca0.png';
import forca1 from './assets/forca1.png';
import forca2 from './assets/forca2.png';
import forca3 from './assets/forca3.png';
import forca4 from './assets/forca4.png';
import forca5 from './assets/forca5.png';
import forca6 from './assets/forca6.png';

import palavras from './palavras';
import alfabeto from './alfabeto';



export default function App (){
    const [tentativas, setTentativas] = useState(0);
    const [arrayPalavra, setArrayPalavra] = useState([]);
    const arrayImagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
    const [iniciado, setIniciado] = useState(false);
    const [tentadas, setTentadas] = useState([]);
    const [palavraChutada, setPalavraChutada] = useState('');


    function iniciarJogo(){
        if(!iniciado){
            setTentadas([]);
            setTentativas(0);
            const numeroDePalavras = palavras.length + 1;
            const indiceEscolhida = Math.round(Math.random()* numeroDePalavras);
            const palavraEscolhida = palavras[indiceEscolhida];
            console.log(palavraEscolhida)

            setArrayPalavra([...palavraEscolhida])

            setIniciado(true);
        }
    }

    function verifica(index){
        if(iniciado){
            const letraEscolhida = alfabeto[index];

            if(!tentadas.includes(letraEscolhida)){            
                let acertou = false;
                for(let i=0; i < arrayPalavra.length; i++){
                    if(arrayPalavra[i].localeCompare(letraEscolhida, 'pt', { sensitivity: 'base' }) === 0){
                        acertou = true;
                    }
                }
                const novoArr = [...tentadas, letraEscolhida]
                setTentadas(novoArr);

                if(acertou){
                    let contador = 1;
                    for(let i=0; i < arrayPalavra.length; i++){
                        if(arrayPalavra[i].localeCompare(letraEscolhida, 'pt', { sensitivity: 'base' }) === 0){
                            contador++;
                        }
                    }
                    console.log(contador)
                    console.log(arrayPalavra.length)
                    if(contador === arrayPalavra.length){
                        setIniciado(false);
                    }
                }

                if(!acertou){
                    const numTentativas = tentativas + 1;
                    setTentativas(numTentativas);
                    if(numTentativas === 6){
                        setIniciado(false)
                    }
                }

            }


        }

    }

    function chutar(chute){
        const resposta = arrayPalavra.join('');
        if(resposta.localeCompare(chute, 'pt', { sensitivity: 'base' }) === 0){
            setTentadas([...tentadas,...resposta])
            setIniciado(false)
        }else{
            setTentativas(6);
            setIniciado(false);
        }
    }


    return (
        <>

            <Iniciar onClick={()=> iniciarJogo()}>
                Escolher Palavra
            </Iniciar>

            <Palavra>
                {
                    arrayPalavra.map((letra, indice) => {
                    if(tentadas.includes(letra)){
                        return <span key={indice}>{letra}</span>
                    } else{
                        return <span>_ </span>
                    }
            })}
            </Palavra>

            <img src={arrayImagens[tentativas]}/>

            <Teclado>
                {alfabeto.map( (letra, index) =>
                    <div onClick={() => verifica(index)}>{letra}</div>
                )}
            </Teclado>

            <input onChange={(e) => setPalavraChutada(e.target.value)}/>
            <div onClick={() => chutar(palavraChutada)}>
                Chutar
            </div>
        </>
    )
}



const Teclado = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items: center;
    height: 70px;
    width: 450px;

    
    div{   
        height: 30px;
        width: 30px;
        font-size:20px;
        background-color: gray;
        color: black;
        display: flex;
        justify-content:center;
        align-items: center;


    }
`

const Iniciar = styled.div`
    width: 70px;
    height: 30px;
    color: white;
    background-color: green;
    cursor: pointer;

`

const Palavra = styled.div`
    font-size: 40px;
    color: black;
    background-color:red;
`


