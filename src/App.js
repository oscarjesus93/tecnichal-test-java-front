
function App() {
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
						<select name="tipoDocumento" className="form-control" id="tipoDocumento">
							<option value="DNI">DNI</option>
							<option value="Pasaporte">Pasaporte</option>
						</select>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label htmlFor="documento">Documento</label>
						<input type="text" name="documento" id="documento" className="form-control" />
					</div>
				</div>

				<div className="col-md-4">
					<button type="button" className="btn btn-success w-100">Buscar</button>
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
									<input type="text" name="nombre" id="nombre" className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="apellido">Apellido</label>
									<input type="text" name="apellido" id="apellido" className="form-control" />
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="direccion">Direccion</label>
									<input type="text" name="direccion" id="direccion" className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input type="email" name="email" id="email" className="form-control" />
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="telefono">Telefono</label>
									<input type="text" name="telefono" id="telefono" className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="estado">Estado</label>
									<input type="text" name="estado" id="estado" className="form-control" />
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="nombreUsuario">Nombre de usuario</label>
									<input type="text" name="nombreUsuario" id="nombreUsuario" className="form-control" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="password">Contrasena</label>
									<input type="password" name="password" id="password" className="form-control" />
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4">

						<butto type="button" className="btn btn-primary w-100">Nuevo</butto>
						<butto type="button" className="btn btn-info w-100 mt-2">Modificar</butto>
						<butto type="button" className="btn btn-success w-100 mt-2">Guardar</butto>
						<butto type="button" className="btn btn-warning w-100 mt-2">Cancelar</butto>

					</div>

				</div>

				<div className="col-md-12">
					<hr />
				</div>

				<div className="col-md-12">
					<button type="button" className="btn btn-success">Registrar suscripcion</button>
				</div>
				
				
			</div>
		</div>
	);
}

export default App;
