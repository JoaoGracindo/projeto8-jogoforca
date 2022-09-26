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

                const novoArr = [...tentadas, letraEscolhida];            
                let acertou = false;
                for(let i=0; i < arrayPalavra.length; i++){
                    if(arrayPalavra[i].localeCompare(letraEscolhida, 'pt', { sensitivity: 'base' }) === 0){
                        acertou = true;
                        novoArr.push(arrayPalavra[i])
                    }
                }

                setTentadas(novoArr);

                if(acertou){
                    let contador = 1;
                    for(let i=0; i < arrayPalavra.length; i++){
                        if(tentadas.includes(arrayPalavra[i])){
                            contador++;
                        }
                    }

                    if(contador === arrayPalavra.length){
                        setIniciado(false);
                    }
                }

                if(!acertou){
                    const numTentativas = tentativas + 1;
                    setTentativas(numTentativas);
                    if(numTentativas === 6){
                        setIniciado(false)
                        setTentadas([...tentadas,...arrayPalavra])
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
            setTentadas([...tentadas,...resposta])
        }
    }


    return (
        <>

            <Iniciar data-identifier="choose-word" onClick={()=> iniciarJogo()}>
                Escolher Palavra
            </Iniciar>

            <Palavra iniciado={iniciado} tentativas={tentativas}>
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
                    <div 
                    key ={index}
                    className={tentadas.includes(alfabeto[index]) ? 'desabilitada' : ''}
                    onClick={() => verifica(index)} >
                        {letra}
                    </div>
                )}
            </Teclado>
            

            <Input>
                <span>Já sei a palavra!</span>
                <input onChange={(e) => setPalavraChutada(e.target.value)}/>
                <div onClick={() => chutar(palavraChutada)}>
                    Chutar
                </div>
            </Input>

        </>
    )
}



const Teclado = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 70px;
    width: 500px;
    margin: 0 auto; 
    

    
    div{
        border: solid 1px black;
        border-radius: 5px;
        margin-right:5px;
        font-weight:600;   
        height: 30px;
        width: 30px;
        font-size:20px;
        color: black;
        display: flex;
        justify-content:center;
        align-items: center;


    }

    .desabilitada{
        background-color:gray;
    }
`

const Iniciar = styled.div`
    width: 200px;
    height: 60px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 22px;
    font-weight:700;
    border-radius: 10px;
    color: white;
    background-color: green;
    cursor: pointer;
    position:absolute;
    top: 70px;
    right:200px;

`

const Palavra = styled.div`
    font-size: 50px;
    position:absolute;
    right:220px;
    top:570px;
    color: ${(props) => 
        (props.iniciado ? 'black' : (props.tentativas === 6 ? 'red' : 'green'))
    };
`

const Input = styled.div`
    margin: 20px auto;
    width:300px;

    div{
        border: solid 1px black;
        background-color:#E1ECF4;
        color: black;
        font-size:22px;
        border-radius: 5px;
        display:flex;
        justify-content:center;
        align-items: center;
        margin-top: 5px;
        cursor:pointer;
    }
`


