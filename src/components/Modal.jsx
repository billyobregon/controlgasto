import { useState, useEffect } from "react";
import Mensaje from './Mensaje'

import CerrarBtn from '../img/cerrar.svg'
const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGastos,
    gastoEditar,
    setGastoEditar
 }) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [categoria, setCategoria] = useState('');

    const [id, setId] = useState('');

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, []);

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);


    }
    const handleSubmit = e => {
        e.preventDefault();
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')


            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }

        guardarGastos({ nombre, cantidad, categoria, id, fecha })

    }



    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="boton cerrar"
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
                >

                <legend>{gastoEditar.nombre ? "Editar gasto" : "nuevo gasto"}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre"> Nombre Gasto</label>

                    <input
                        id='nombre'
                        type="text"
                        placeholder='añade el nombre de campo'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>

                    <input
                        id='cantidad'
                        type="number"
                        placeholder='añade la cantidad del gasto: ej. 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">comida</option>
                        <option value="casa">casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir gasto"}
                />

            </form>
        </div>
    )
}

export default Modal