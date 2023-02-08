import { useState } from "react"; 
import Swal from 'sweetalert2';
import axios from "axios";

function App() {

	const [ tipoDocumento, guardarTipoDocumento ] = useState('');
	const [ numeroDocumento, guardarNumeroDocumento ] = useState('');	
	const [ idSuscriptor, guardarIdSuscriptor ] = useState(0);
	const [ buttonDisabledModificar, guardarButtonDisabledModificar ] = useState(true);
	const [ buttonDisabledGuardar, guardarButtonDisabledGuardar ] = useState(true);
	const [ buttonDesabledSuscripcion, guardarButtonDisabledSuscripcion ] = useState(true);
	const [ formularioDeshabilitado, guardarFormularioDeshabilitado ] = useState(false);

	const consultarDatosSuscriptor = async () => {

		axios.get(`http://localhost:8080/suscriptor?numeroDocumento=${numeroDocumento}&tipoDocumento=${tipoDocumento}`)
		.then(response => {
			return response;
		})
		.catch(error => {			
			if(error.response.status === 404){
				Swal.fire({
					title: error.response.data.message,
					showCancelButton: true,
					confirmButtonText: 'Si'
				}).then((result) => {	
					console.log(result);			
					if (result.isConfirmed) {
						document.getElementById("tipoDocumento").disabled = true;
						document.getElementById("documento").disabled = true;

						guardarButtonDisabledGuardar(false);
						guardarButtonDisabledModificar(true);

						colocarCamposDesable(false);
						
						limpiarCAmpos();
					} else  {
						document.getElementById("tipoDocumento").disabled = false;
						document.getElementById("documento").disabled = false;
						document.getElementById("tipoDocumento").value = "";
						document.getElementById("documento").value = "";

						guardarButtonDisabledGuardar(true);
						guardarButtonDisabledModificar(true);

						colocarCamposDesable(true);
					}
				})
			}
		})
		.then(response => {

			const { data } = response;
			guardarIdSuscriptor(data.idSuscriptor);
			consultarSuscripcion(data.idSuscriptor);
			document.getElementById("nombre").value = data.nombre;			
			document.getElementById("apellido").value = data.apellido;
			document.getElementById("direccion").value = data.direccion;
			document.getElementById("telefono").value = data.telefono;
			document.getElementById("email").value = data.email;
			document.getElementById("nombreUsuario").value = data.nombreUsuario;
			document.getElementById("password").value = data.password;

			colocarCamposDesable(true);

			guardarButtonDisabledGuardar(true);
			guardarButtonDisabledModificar(false);
			guardarButtonDisabledSuscripcion(false);
		})		
		
	}


	const consultarSuscripcion = async (id) => {
		await axios.get(`http://localhost:8080/suscripcion?idSuscriptor=${id}`)
		.then(response => {
			return response;
		})
		.catch(error => {
			console.log(error);
			return error.response;
		})
		.then(response => {
			console.log(response);
			if(response.status === 200){
				document.getElementById("estado").value = "Suscrito";
			} else {
				document.getElementById("estado").value = "No suscrito";
			}			
		})
	}

	const registrarSuscriptor = () => {
		const data = {
			apellido: document.getElementById("apellido").value,
			direccion: document.getElementById("direccion").value,
			email: document.getElementById("email").value,			
			nombre: document.getElementById("nombre").value,
			nombreUsuario: document.getElementById("nombreUsuario").value,
			numeroDocumento: numeroDocumento,
			password: document.getElementById("password").value,
			telefono: document.getElementById("telefono").value,
			tipoDocumento: tipoDocumento
		}

		axios.post('http://localhost:8080/suscriptor', data)
					.then(response => {
						return response;
					})
					.catch(error => {
						if(error.response.status === 400){
							Swal.fire({
								title: error.response.data.message,
								showCancelButton: true,
								confirmButtonText: 'Si'
							}).then((result) => {
								if (result.isConfirmed) {
									document.getElementById("tipoDocumento").disabled = true;
									document.getElementById("documento").disabled = true;
			
									guardarButtonDisabledGuardar(false);
									guardarButtonDisabledModificar(true);
			
									colocarCamposDesable(false);
								} else  {
									document.getElementById("tipoDocumento").disabled = false;
									document.getElementById("documento").disabled = false;
									document.getElementById("tipoDocumento").value = "";
									document.getElementById("documento").value = "";
			
									guardarButtonDisabledGuardar(true);
									guardarButtonDisabledModificar(true);
			
									colocarCamposDesable(true);
								}
							})
						}
					})
					.then(data => {
						console.log(data)
						
						document.getElementById("tipoDocumento").disabled = false;
						document.getElementById("documento").disabled = false;	
						
						colocarCamposDesable(true);

						Swal.fire('El suscriptor se registro con exito')

						buttonCancelarNuevo(true);
					})
	}

	const actualizarSuscriptor = async () => {

		if(formularioDeshabilitado == true){

			colocarCamposDesable(false);
			guardarFormularioDeshabilitado(false);
			return;
		}

		const data = {
			apellido: document.getElementById("apellido").value,
			direccion: document.getElementById("direccion").value,
			email: document.getElementById("email").value,			
			nombre: document.getElementById("nombre").value,
			nombreUsuario: document.getElementById("nombreUsuario").value,			
			password: document.getElementById("password").value,
			telefono: document.getElementById("telefono").value
		}

		await axios.put(`http://localhost:8080/suscriptor/${idSuscriptor}`, data).then(response => {
			return response;
		}).catch(error => {
			if(error.response.status === 400){
				Swal.fire({
					title: error.response.data.message,
					showCancelButton: false,
					confirmButtonText: 'Ok'
				}).then((result) => {
					if (result.isConfirmed) {
						document.getElementById("tipoDocumento").disabled = true;
						document.getElementById("documento").disabled = true;

						guardarButtonDisabledGuardar(false);
						guardarButtonDisabledModificar(true);		
						
						colocarCamposDesable(true);
						buttonCancelarNuevo(true);
					} 
				})
			}
		}).then(response => {
			console.log(response);
			const { data } = response;
			Swal.fire({
				title: data.message,
				showCancelButton: false,
				confirmButtonText: 'Ok'
			}).then((result) => {
				if (result.isConfirmed) {
					document.getElementById("tipoDocumento").disabled = false;
					document.getElementById("documento").disabled = false;

					guardarButtonDisabledGuardar(false);
					guardarButtonDisabledModificar(false);		
					
					colocarCamposDesable(true);
				} 
			})
		})
	}

	const registrarSuscripcion = async () => {
		Swal.fire({
			title: 'Estas seguro de registrar la suscripción?',
			showDenyButton: true,
			showCancelButton: false,
			confirmButtonText: 'Registrar',
			denyButtonText: `Cancelar`,
		}).then((result) => {
			console.log(result);
			/* Read more about isConfirmed, isDenied below */
			if (result.value) {

				registrar();
			  	
			} else {
				document.getElementById("tipoDocumento").disabled = false;
				document.getElementById("documento").disabled = false;

				guardarButtonDisabledGuardar(false);
				guardarButtonDisabledModificar(false);		
				
				colocarCamposDesable(true);
				limpiarCAmpos();
				buttonCancelarNuevo(true);
			}
		})

		
	}

	const registrar = async () => {
		const payload = {
			idSuscriptor: idSuscriptor
		}
		await axios.post('http://localhost:8080/suscripcion', payload).then(response => {
			return response;
		}).catch(error => {
			console.log(error);
			if(error.response.status === 400){
				Swal.fire({
					title: error.response.data.message,
					showCancelButton: false,
					confirmButtonText: 'Ok'
				}).then((result) => {
					if (result.isConfirmed) {
						document.getElementById("tipoDocumento").disabled = true;
						document.getElementById("documento").disabled = true;

						guardarButtonDisabledGuardar(false);
						guardarButtonDisabledModificar(true);		
						
						colocarCamposDesable(true);
						buttonCancelarNuevo(true);
					} 
				})
			}
			guardarIdSuscriptor(0);

		}).then(response => {
			if(response != undefined || Object.keys(response).length > 0){
				Swal.fire('Suscripción registrada con exito', '', 'success')
				.then(() => {
					document.getElementById("tipoDocumento").disabled = true;
						document.getElementById("documento").disabled = true;

						guardarButtonDisabledGuardar(false);
						guardarButtonDisabledModificar(true);		
						
						colocarCamposDesable(true);
						buttonCancelarNuevo(true);
				})
			}	
						
		})
	}

	const colocarCamposDesable = (valor) => {

		guardarFormularioDeshabilitado(true);

		document.getElementById("nombre").disabled = valor;
		document.getElementById("apellido").disabled = valor;
		document.getElementById("direccion").disabled = valor;
		document.getElementById("telefono").disabled = valor;
		document.getElementById("email").disabled = valor;
		document.getElementById("nombreUsuario").disabled = valor;
		document.getElementById("password").disabled = valor;
	}

	const limpiarCAmpos = () => {
		document.getElementById("nombre").value = "";
		document.getElementById("apellido").value = "";
		document.getElementById("direccion").value = ""
		document.getElementById("telefono").value = ""
		document.getElementById("email").value = ""
		document.getElementById("nombreUsuario").value = ""
		document.getElementById("password").value = ""
	}

	const buttonCancelarNuevo = (valor) => {
		colocarCamposDesable(valor);

		if(valor == false){
			guardarButtonDisabledGuardar(false);
			guardarButtonDisabledModificar(true);		
		} else {
			guardarButtonDisabledGuardar(true);
			guardarButtonDisabledModificar(true);
		}

		document.getElementById("tipoDocumento").disabled = false;
		document.getElementById("documento").disabled = false;
		document.getElementById("tipoDocumento").value = "";
		document.getElementById("documento").value = "";

		guardarNumeroDocumento("");
		guardarTipoDocumento("");

		document.getElementById("nombre").value = "";
		document.getElementById("apellido").value = "";
		document.getElementById("direccion").value = "";
		document.getElementById("telefono").value = "";
		document.getElementById("email").value = "";
		document.getElementById("nombreUsuario").value = "";
		document.getElementById("password").value = "";
		guardarButtonDisabledSuscripcion(true);
	}


	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-12 pt-3 text-center">
					<h1>Suscripcion</h1>
					<p>Para realizar la suscripción complete los siguientes campos</p>
				</div>

				<div className="col-md-12"><hr /></div>
				<h3>Buscar suscriptor</h3>
				<div className="col-md-4">					
					<div className="form-group">
						<label htmlFor="tipoDocumento">Tipo documento</label>
						<select name="tipoDocumento" className="form-control" id="tipoDocumento" onChange={e => guardarTipoDocumento(e.target.value)}>
							<option value="">Seleccione</option>
							<option value="DNI">DNI</option>
							<option value="Pasaporte">Pasaporte</option>
						</select>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="documento">Documento</label>
						<input type="text" name="documento" id="documento" value={numeroDocumento} onChange={e => guardarNumeroDocumento(e.target.value)} className="form-control" />
					</div>
				</div>

				<div className="col-md-4">
					<button type="button" onClick={() => consultarDatosSuscriptor()} className="btn btn-success w-100">Buscar</button>
				</div>

				<div className="col-md-12">
					<hr />
				</div>

				<h3>Datos del suscriptor</h3>

				<div className="row">

					<div className="col-md-8">
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="nombre">Nombre</label>
									<input type="text" name="nombre" id="nombre" required={true} disabled className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="apellido">Apellido</label>
									<input type="text" name="apellido" id="apellido" required={true} disabled className="form-control" />
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="direccion">Direccion</label>
									<input type="text" name="direccion" id="direccion" required={true} disabled className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input type="email" name="email" id="email" required={true} disabled className="form-control" />
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="telefono">Telefono</label>
									<input type="text" name="telefono" id="telefono" required={true} disabled className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="estado">Estado</label>
									<input type="text" name="estado" id="estado" disabled className="form-control" />
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="nombreUsuario">Nombre de usuario</label>
									<input type="text" name="nombreUsuario" id="nombreUsuario" required={true} disabled className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="password">Contrasena</label>
									<input type="password" name="password" id="password" required={true} disabled className="form-control" />
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4">

						<button type="button" onClick={() => buttonCancelarNuevo(false)} className="btn btn-primary w-100">Nuevo</button>
						<button type="button" onClick={() => actualizarSuscriptor()} disabled={buttonDisabledModificar} className="btn btn-info w-100 mt-2">Modificar</button>
						<button type="button" onClick={() => registrarSuscriptor()} disabled={buttonDisabledGuardar} className="btn btn-success w-100 mt-2">Guardar</button>
						<button type="button" onClick={() => buttonCancelarNuevo(true)} className="btn btn-warning w-100 mt-2">Cancelar</button>

					</div>

				</div>

				<div className="col-md-12">
					<hr />
				</div>

				<div className="col-md-12">
					<button type="button" onClick={() => registrarSuscripcion()} disabled={buttonDesabledSuscripcion} className="btn btn-success">Registrar suscripcion</button>
				</div>
				
				
			</div>
		</div>
	);
}

export default App;
