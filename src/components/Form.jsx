import { useState } from 'react';
import Axios from 'axios';
import './form.css'
const Form = () => {

    const [valor1, setValor1] = useState(0);
    const [valor2, setValor2] = useState(0);
    const [valor3, setValor3] = useState(0);
    const [ec1, setEc1] = useState(0);
    const [ec2, setEc2] = useState(0);
    const [calculado, setCalculado] = useState(false);

    const guardar = async (e) => {
        e.preventDefault();
        const resultado1 = {
            valor1,
            valor2,
            valor3
        };
        const respuesta = await Axios.post("https://webservice-tere.herokuapp.com/formula/general", resultado1);
        const mensaje = respuesta.data.soluciones;
        const { ecuacion1, ecuacion2 } = mensaje;
        setEc1(ecuacion1);
        setEc2(ecuacion2);
        setCalculado(true);

    };

    const limpiar = (e) => {
        window.location.href = "/";
    }
    return (
        <>
            <div className="card">
                <div className="img">
                    <img src="https://img.icons8.com/external-becris-lineal-color-becris/64/000000/external-math-literary-genres-becris-lineal-color-becris.png" alt='MATH' />
                </div>
                <h2>Matemáticas<br /><span>Fórmula General</span></h2>
                <form onSubmit={guardar}>
                    <div>
                        <label>Ingrese Valor a: </label>
                        <input type="number" placeholder='Ej. 5' className='form-control' onChange={(e) => setValor1(e.target.value)} required autoFocus />
                    </div>
                    <div>
                        <label className='mt-2'>Ingrese Valor b: </label>
                        <input type="number" placeholder='Ej. 2' className='form-control' onChange={(e) => setValor2(e.target.value)} required />
                    </div>
                    <div>
                        <label className='mt-2'>Ingrese Valor c: </label>
                        <input type="number" placeholder='Ej. -3' className='form-control' onChange={(e) => setValor3(e.target.value)} required />
                    </div>
                    {
                        (!calculado) ?
                            <button className='btn btn-outline-info mt-4' type="submit">Calcular</button>

                            : <button onClick={(e) => limpiar(e)} className='btn btn-outline-success mt-4' type="submit">Limpiar</button>
                    }

                </form>

                {
                    (calculado) ?
                        <>
                            <div className="alert alert-primary mt-2 badge badge-info" role="alert">
                                Ecuación  x1 : {ec1.toFixed(1)}
                            </div>
                            <div className="alert alert-dark badge badge-dark" role="alert">
                                Ecuación x2 : {ec2.toFixed(1)}
                            </div>
                        </>
                        :
                        null
                }


                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#052c48" fillOpacity="1" d="M0,192L15,170.7C30,149,60,107,90,106.7C120,107,150,149,180,144C210,139,240,85,270,69.3C300,53,330,75,360,112C390,149,420,203,450,208C480,213,510,171,540,165.3C570,160,600,192,630,176C660,160,690,96,720,58.7C750,21,780,11,810,37.3C840,64,870,128,900,176C930,224,960,256,990,261.3C1020,267,1050,245,1080,245.3C1110,245,1140,267,1170,234.7C1200,203,1230,117,1260,80C1290,43,1320,53,1350,90.7C1380,128,1410,192,1425,224L1440,256L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"></path></svg>
                <i><a href='https://github.com/tony-coreno' target="_blank"><img src="https://img.icons8.com/material-outlined/24/000000/github.png " alt='GitHub' /></a></i>

            </div>
        </>
    );
}

export default Form;