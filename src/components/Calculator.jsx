import React, { useState, useEffect } from "react";
import '../App.css'

export function Calculator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    

    function Input(e) {
        if (result !== "") {
            setInput(result + e.target.value);
            setResult("");
        } else {
            setInput(input + e.target.value);
        }
    }

    function Clear() {
        setInput("");
        setResult("");
    }

    /* Elimina el último valor del input */
    function Delete() {
        if (result) {
        setResult(result.toString().slice(0, -1));
        } else {
            setInput(input.toString().slice(0, -1));
        }
    }

    /* El método eval, en algunos paises no reconode la , como medida decimal, por lo tanto, sustituimos todas las , por . */
    /* Si el input incluye % calcularemos el % de X. Por ejemplo: 70%7 = 7% de 70 =  4.9*/
    function Calculate() {
        let inputWithDots = input.replace(/,/g, ".");
        let result;
        try {
            if (inputWithDots.includes("%")) {
                const [num, percent] = inputWithDots.split("%");
                result = eval(`${num}*${percent*0.01}`).toFixed(2); // Máximo 2 decimales
            } else {
                result = eval(inputWithDots);
            }
        } catch (e) {
            result = "Error";
        }
        setResult(result);
    }

    /* se agrega un manejador de eventos de teclado en el componente utilizando el método useEffect(). El manejador de eventos se agregará cuando el componente sea montado y se eliminará cuando el componente sea desmontado.*/
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter") {
                Calculate();
            } else if (/^[0-9/*\-+.%]$/.test(event.key)) {
                setInput(input + event.key);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [input]);

    return (
        <div className="container">

        <div className="nwindow">
            <input className="bgBlack" type="text" value={!result ? input : result} onChange={Input} disabled />
            {/* Si resultado está vacío, muestra el input, si tenemos resultado, mostrará solo el resultado */}
        </div>
            
            <div className="buttons">
                <button></button>
                <button></button>
                <button onClick={Delete}>DEL</button>
                <button className="bgOrange" onClick={Input} value='%'>%</button>

                <button onClick={Input} value='7'>7</button>
                <button onClick={Input} value='8'>8</button>
                <button onClick={Input} value='9'>9</button>
                <button className="bgOrange" onClick={Input} value='/'>/</button>

                <button onClick={Input} value='4'>4</button>
                <button onClick={Input} value='5'>5</button>
                <button onClick={Input} value='6'>6</button>
                <button className="bgOrange" onClick={Input} value='*'>*</button>

                <button onClick={Input} value='1'>1</button>
                <button onClick={Input} value='2'>2</button>
                <button onClick={Input} value='3'>3</button>
                <button className="bgOrange" onClick={Input} value='+'>+</button>
                <button onClick={Clear}>C</button>
                <button onClick={Input} value='0'>0</button>
                <button onClick={Input} value=','>,</button>
                <button className="bgOrange" onClick={Calculate}>=</button>
            </div>
            
        </div>
    );
}
