import { NavbarProps } from '../types/types';
import Button from './generic/Button';

const Navbar = (props: NavbarProps) => {
	const { handleLogOut, setToken } = props;

	return (
		<div className='navbar'>
			<div className='navbarWelcomeBox'></div>
			<div className='navbarTodoBox'>
				<h3>Todo</h3>
			</div>
			<div className='navbarLogOutBox'>
				<Button className={'buttonLogOut'} buttonContent={'Log out'} onClick={() => handleLogOut(setToken)} />
			</div>
		</div>
	);
};

export default Navbar;
