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
    const [tentativas, setTentaticas] = useState(0);
    const arrayPalavra = [];
    const arrayImagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]

    function iniciaJogo(){
        const numeroDePalavras = palavras.length + 1;
        const palavraEscolhida = Math.round(Math.random()* numeroDePalavras);
        
        for(let i=0;i < palavraEscolhida.length; i++ ){
            arrayPalavra.push(palavraEscolhida[i]);
        }

    }

    function verifica(index){
        const letraEscolhida = alfabeto[index];
        const acertou = arrayPalavra.includes(letraEscolhida);

    }


    return (
        <>

            <img src={arrayImagens[tentativas]}/>

            <Teclado>
                {alfabeto.map( (letra, index) =>
                    <div onClick={() => verifica(index)}>{letra}</div>
                )}
            </Teclado>
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


