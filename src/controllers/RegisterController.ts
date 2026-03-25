import { User } from "../models/User.js";
import { UserService } from "../services/UserService.js";

export class RegisterController{
    private userService = UserService.getInstance();

    init(){
        this.attachEvents();
    }
    private attachEvents():void{
        document.querySelector('#register-form')?.addEventListener('submit', async (e:Event)=>{
            e.preventDefault();
            let name:string = (document.querySelector('#name') as HTMLInputElement).value;
            let phone:string = (document.querySelector('#phone') as HTMLInputElement).value;
            let email:string = (document.querySelector('#email') as HTMLInputElement).value;
            let password:string = (document.querySelector('#password') as HTMLInputElement).value;

            if( !await this.userService.checkEmailValid(email)){
                alert('Email đã tồn tại không thể đăng ký!!');
            }else{
                this.userService.create(new User(
                    undefined,email,password,phone,
                    name,"","user"
                ));
                alert('Đăng ký thàng công!!!');
                location.href = 'login.html';
            }
        })
    }
}