import React, { useEffect, useState } from "react";
import '../../Styles/signUp.scss'

function FormEdit(props) {
	const { isOpen , value , idEdit}= props
	const [input, setInput] = useState({
		fistName: "",
		lastName: "",
		email: "",
		birthday:"",
		gender: "nam",
		useName: "",
		password: "",
		repeatpassword:""
	})
	useEffect(() => {
		setInput(value)
	},[value]) 
	const handleInput = (e) => {
		const { value, name} = e.target;
		setInput({
			...input,
			[name]: value,
		});
	}
	const handleSaveSignUp = () => {
		if (input.password !== input.repeatpassword) {
			return(alert("Nhập sai repeatpassword"))
		}
		if (input.email.includes("@") === false) {
			return(alert("Vui lòng nhập lại email !"))
		}
		let arr={
			fistName: input.fistName,
			lastName: input.lastName,
			email: input.email,
			birthday:input.birthday,
			gender: input.gender,
			useName: input.useName,
			password:input.password,
		}
		input.fistName = ""
		input.lastName=""
		input.password = ""
		input.repeatpassword = ""
		input.birthday = ""
		input.gender = ""
		input.fistName = ""
		input.useName=""
		props.handleSaveSignUp(arr)
		props.handleIsOpen()
	}
	const handleIsOpen = () => {
		props.handleIsOpen()
	}
	return (
		<div>
			{isOpen ? 
				<div className="modal" tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{ (idEdit > 0 ? "Sửa" : "Thêm mới")}</h5>
							<button onClick={handleIsOpen} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
						<form>
							<div className="row">
								<div className="col">
									First name: <input type="text" onChange={handleInput} value={input.fistName} className="form-control" placeholder="First name" name="fistName"/>
								</div>
								<div className="col">
									Last name:<input type="text" className="form-control" placeholder="Last name" onChange={handleInput} value={input.lastName} name="lastName"/>
								</div>
							</div>
							<div className="row">
								<div className="col">
									
									Email:<input type="email" className="form-control" placeholder="Email" onChange={handleInput} value={input.email} name="email" />
								</div>
							</div>
							<div className="row">
					
								<div className="col">
									BirthDay:<input type="date" className="form-control" placeholder="BirthDay" onChange={handleInput} value={input.birthday} name="birthday"/>
								</div>
								<div className="col">
									Gender:
									<div className="input-group mb-3">
										<select className="form-select" name="gender" value={input.gender} onChange={handleInput} id="inputGroupSelect01">
											<option  value="nam">nam</option>
											<option value="nữ">nữ</option>
										</select>
									</div>
								</div>				
							</div>
							<div className="row">
								<div className="col">
									
									UseName:<input type="text" className="form-control" placeholder="UseName" name="useName" value={input.useName} onChange={handleInput}/>
								</div>
							</div>
							<div className="row">
								<div className="col">
									password:<input type="password" className="form-control" placeholder="password" name="password" value={input.password} onChange={handleInput}/>
								</div>
								<div className="col">
									Repeat Password:<input type="password" className="form-control" placeholder=" Repeat Password" name="repeatpassword" value={input.repeatpassword} onChange={handleInput}/>
								</div>
							</div>
						</form>
						</div>
							<div className="modal-footer">
								<button type="button" onClick={handleIsOpen} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="button"  onClick={handleSaveSignUp} className="btn btn-primary">{ (idEdit > 0 ? "Sửa" : "Thêm mới")}</button>
							</div>
						</div>
					</div>
				</div>
			: false}
		</div>
	)
}
export default FormEdit;